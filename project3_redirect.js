(async () => {
    
    // Highcharts code for fetching U.S. map
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json').then(response => response.json());
    console.log("Topology fetched");
    
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
        let tableMergeClean = tableMergeClean.map(row => ({
            ...row,
            'Mean Salary': parseFloat(row['Mean Salary']),
            'Probability': parseFloat(row['Probability'])
        }));

        // Round "Mean Salary" to the nearest whole dollar amount
        tableMergeClean.forEach(row => {
        row['Mean Salary'] = Math.round(row['Mean Salary']);
        });
        
        // Create a new array with Probability >= 0.80
        let above80 = tableMergeClean.filter(row => row['Probability'] >= 0.80);
        
        // Initialize an object to store the sums of each state column
        let stateSums = {};

        // Loop through the tableMerge data to calculate sums
        above80.forEach(row => {
            // Loop through each state column and sum the values
            for (let state in row) {
                if (state !== 'Occupation' && state !== 'Total Employed' && state !== 'Mean Salary' && state !== 'Probability') {stateSums[state] = (stateSums[state] || 0) + parseFloat(row[state]);
                }
            }
        });

        // Create an array to hold the state-sum pairs
        let stateSumPairs = [];

        // Convert the state sums object into an array of pairs
        for (let state in stateSums) {
            stateSumPairs.push([state, stateSums[state]]);
        }

        // Create a mapping of state names to map keys
        let stateKeyMap = {
            'Alabama': 'us-al',
            'Alaska': 'us-ak',
            'Arizona': 'us-az',
            'Arkansas': 'us-ar',
            'California': 'us-ca',
            'Colorado': 'us-co',
            'Connecticut': 'us-ct',
            'Delaware': 'us-de',
            'Florida': 'us-fl',
            'Georgia': 'us-ga',
            'Hawaii': 'us-hi',
            'Idaho': 'us-id',
            'Illinois': 'us-il',
            'Indiana': 'us-in',
            'Iowa': 'us-ia',
            'Kansas': 'us-ks',
            'Kentucky': 'us-ky',
            'Louisiana': 'us-la',
            'Maine': 'us-me',
            'Maryland': 'us-md',
            'Massachusetts': 'us-ma',
            'Michigan': 'us-mi',
            'Minnesota': 'us-mn',
            'Mississippi': 'us-ms',
            'Missouri': 'us-mo',
            'Montana': 'us-mt',
            'Nebraska': 'us-ne',
            'Nevada': 'us-nv',
            'New Hampshire': 'us-nh',
            'New Jersey': 'us-nj',
            'New Mexico': 'us-nm',
            'New York': 'us-ny',
            'North Carolina': 'us-nc',
            'North Dakota': 'us-nd',
            'Ohio': 'us-oh',
            'Oklahoma': 'us-ok',
            'Oregon': 'us-or',
            'Pennsylvania': 'us-pa',
            'Rhode Island': 'us-ri',
            'South Carolina': 'us-sc',
            'South Dakota': 'us-sd',
            'Tennessee': 'us-tn',
            'Texas': 'us-tx',
            'Utah': 'us-ut',
            'Vermont': 'us-vt',
            'Virginia': 'us-va',
            'Washington': 'us-wa',
            'West Virginia': 'us-wv',
            'Wisconsin': 'us-wi',
            'Wyoming': 'us-wy',
            };

        // Format the data for Highcharts Map
        const data = stateSumPairs.map(([state, sum]) => [stateKeyMap[state], sum]);
        
        // Create the chart
        Highcharts.mapChart('container', {
            chart: {map: topology
                   },

            title: {text: 'Jobs Lost to Automation: Impact by State'},
            subtitle: {text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/us/us-all.topo.json">United States of America</a>'},

            mapNavigation: {enabled: true, buttonOptions: {verticalAlign: 'bottom'}
                           },
            colorAxis: {min: 0},
            series: [{data: data, name: 'Random data', 
                      states: {hover: {color: '#BADA55'}},
                      dataLabels: {enabled: true, format: '{point.name}'
                                  }
                     }]
        });
    })();
})
