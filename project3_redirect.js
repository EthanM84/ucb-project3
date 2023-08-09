(async () => {
    
    // Import data from two .csv files
    Promise.all([
        fetch('NEW_data_files/occupation_salary_2.csv').then(response => response.text()),
        fetch('NEW_data_files/automation_data_by_state_2.csv').then(response => response.text())
    ]).then(([occSalaryCSV, autoDataCSV]) => {
        // Parse CSV data
        let parseCSV = csv => {
            let rows = csv.split('\n');
            let header = rows[0].split(',');
            let data = rows.slice(1).map(row => row.split(','));
            return data.map(row => Object.fromEntries(row.map((cell, index) => [header[index], cell])));};

        // Assign variable to Table 1
        let occSalary = parseCSV(occSalaryCSV);
        // Assign variable to Table 2
        let autoData = parseCSV(autoDataCSV);

        // Rename columns in Table 1 for merge prep
        occSalary = occSalary.map(row => ({
            ...row,
            'Occupation': row['OCC_TITLE'],
            'Total Employed': row['TOT_EMP'],
            'Mean Salary': row['A_MEAN']}));
       
        // Merge tables on 'Occupation'
        let tableMerge = autoData.map(autoRow => {
            let occRow = occSalary.find(occRow => occRow['Occupation'] === autoRow['Occupation']);
            return {
                'Occupation': autoRow['Occupation'],
                'Probability': autoRow['Probability'],
                'Alabama': autoRow['Alabama'],
                'Alaska': autoRow['Alaska'],
                'Arizona': autoRow['Arizona'],
                'Arkansas': autoRow['Arkansas'],
                'California': autoRow['California'],
                'Colorado': autoRow['Colorado'],
                'Connecticut': autoRow['Connecticut'],
                'Delaware': autoRow['Delaware'],
                'Florida': autoRow['Florida'],
                'Georgia': autoRow['Georgia'],
                'Hawaii': autoRow['Hawaii'],
                'Idaho': autoRow['Idaho'],
                'Illinois': autoRow['Illinois'],
                'Indiana': autoRow['Indiana'],
                'Iowa': autoRow['Iowa'],
                'Kansas': autoRow['Kansas'],
                'Kentucky': autoRow['Kentucky'],
                'Louisiana': autoRow['Louisiana'],
                'Maine': autoRow['Maine'],
                'Maryland': autoRow['Maryland'],
                'Massachusetts': autoRow['Massachusetts'],
                'Michigan': autoRow['Michigan'],
                'Minnesota': autoRow['Minnesota'],
                'Mississippi': autoRow['Mississippi'],
                'Missouri': autoRow['Missouri'],
                'Montana': autoRow['Montana'],
                'Nebraska': autoRow['Nebraska'],
                'Nevada': autoRow['Nevada'],
                'New Hampshire': autoRow['New Hampshire'],
                'New Jersey': autoRow['New Jersey'],
                'New Mexico': autoRow['New Mexico'],
                'New York': autoRow['New York'],
                'North Carolina': autoRow['North Carolina'],
                'North Dakota': autoRow['North Dakota'],
                'Ohio': autoRow['Ohio'],
                'Oklahoma': autoRow['Oklahoma'],
                'Oregon': autoRow['Oregon'],
                'Pennsylvania': autoRow['Pennsylvania'],
                'Rhode Island': autoRow['Rhode Island'],
                'South Carolina': autoRow['South Carolina'],
                'South Dakota': autoRow['South Dakota'],
                'Tennessee': autoRow['Tennessee'],
                'Texas': autoRow['Texas'],
                'Utah': autoRow['Utah'],
                'Vermont': autoRow['Vermont'],
                'Virginia': autoRow['Virginia'],
                'Washington': autoRow['Washington'],
                'West Virginia': autoRow['West Virginia'],
                'Wisconsin': autoRow['Wisconsin'],
                'Wyoming': autoRow['Wyoming'],
                'Total Employed': occRow['Total Employed'],
                'Mean Salary': occRow['Mean Salary']};
        });
        
        // Convert "Mean Salary" and "Probability" columns to numeric
        tableMergeClean = tableMergeClean.map(row => ({
            ...row,
            'Mean Salary': parseFloat(row['Mean Salary']),
            'Probability': parseFloat(row['Probability'])
        }));

        // Round "Mean Salary" to the nearest whole dollar amount
        tableMergeClean.forEach(row => {
        row['Mean Salary'] = Math.round(row['Mean Salary']);
        });
        
        // Highcharts code for fetching U.S. map
        const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json').then(response => response.json());
    
        // Create a new array with Probability >= 0.80
        let above80 = tableMergeClean.filter(row => row['Probability'] >= 0.80);
        
        // Transform data in preparation for joining to map
        
        // Prepare demo data. 
        const data = [
            ['us-ma', 10], ['us-wa', 11], ['us-ca', 12], ['us-or', 13],
            ['us-wi', 14], ['us-me', 15], ['us-mi', 16], ['us-nv', 17],
            ['us-nm', 18], ['us-co', 19], ['us-wy', 20], ['us-ks', 21],
            ['us-ne', 22], ['us-ok', 23], ['us-mo', 24], ['us-il', 25],
            ['us-in', 26], ['us-vt', 27], ['us-ar', 28], ['us-tx', 29],
            ['us-ri', 30], ['us-al', 31], ['us-ms', 32], ['us-nc', 33],
            ['us-va', 34], ['us-ia', 35], ['us-md', 36], ['us-de', 37],
            ['us-pa', 38], ['us-nj', 39], ['us-ny', 40], ['us-id', 41],
            ['us-sd', 42], ['us-ct', 43], ['us-nh', 44], ['us-ky', 45],
            ['us-oh', 46], ['us-tn', 47], ['us-wv', 48], ['us-dc', 49],
            ['us-la', 50], ['us-fl', 51], ['us-ga', 52], ['us-sc', 53],
            ['us-mn', 54], ['us-mt', 55], ['us-nd', 56], ['us-az', 57],
            ['us-ut', 58], ['us-hi', 59], ['us-ak', 60]
        ];

    // Create the chart
    Highcharts.mapChart('container', {
        chart: {map: topology
        },

        title: {text: 'Highcharts Maps basic demo'
        },

        subtitle: {text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/us/us-all.topo.json">United States of America</a>'
        },

        mapNavigation: {enabled: true, buttonOptions: {verticalAlign: 'bottom'}
        },

        colorAxis: {min: 0},

        series: [{data: data, name: 'Random data', 
                  states: {hover: {color: '#BADA55'}},
                  dataLabels: {enabled: true, format: '{point.name}'}}]});
    })();

    
    ============================================
        // HELP >> Eliminate unnecessary columns -OR- specify columns to include?
        let plotByState = above80.map(row => ({
            ...row,
            'OCC_Code': undefined,
            'Occupation': undefined,
            'Probability': undefined,
            'Total Employed': undefined,
            'Mean Salary': undefined}));

        // Obtain total count of jobs lost by state
        let plotByStateSum = {};
        plotByState.forEach(row => {
            Object.keys(row).forEach(key => {
                if (key !== 'State') {
                    plotByStateSum[key] = (plotByStateSum[key] || 0) + parseFloat(row[key]);}
            });
        });
    
    // Create arrays for state names and job counts
      let states = Object.keys(plotByStateSum);
      let jobCounts = Object.values(plotByStateSum);

      // Create the bar chart using Plotly.js
      let trace = {x: states, y: jobCounts, type: 'bar'};

      let layout = {
          title: 'Anticipated Number of Jobs Lost to Automation',
          xaxis: {title: 'State', tickangle: -45, automargin: true},
          yaxis: {title: '# of Jobs'}};

    Plotly.newPlot('barChart', [trace], layout);
}).catch(error => {
    console.error('An error occurred:', error);
});
