// Use PapaParse to parse the CSV data
function parseCSV(csvData) {
    let parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
    })
    return parsedData.data;
}

// Load the CSV files using jQuery's $.get method
$.when(
    $.get('Resources/occupation_salary_2.csv'),
    $.get('Resources/automation_data_by_state_2.csv'))
.done(function(occSalaryCSV, autoDataCSV) {
    
    // Parse the CSV data using the parseCSV function
    let occSalary = parseCSV(occSalaryCSV[0]);
    let autoData = parseCSV(autoDataCSV[0]);
       
    // Rename columns from Table 1 for merge prep
    occSalary = occSalary.map(row => ({
        ...row,
        'SOC': row['OCC_CODE'],
        'Occupation': row['OCC_TITLE'],
        'Total Employed': row['TOT_EMP'],
        'Mean Salary': row['A_MEAN']
    }));
 
    // Merge tables on 'Occupation'
    let tableMerge = autoData.map(autoRow => {
        let occRow = occSalary.find(
            (occRow) => occRow['Occupation'] === autoRow['Occupation']
        );
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
            'Mean Salary': occRow['Mean Salary']
        };
    });
     
    // Convert "Probability" values to decimal
    let tableMergeClean = tableMerge.map(row => ({
        ...row,
        'Probability': parseFloat(row['Probability'])
    }));
    
    // Loop through all remaining columns (with 3 exceptions) and set data type to integer
    tableMergeClean.forEach((row) => {
        for (let value in row) {
            if (value !== 'SOC' && value !== 'Occupation' && value !== 'Probability'){
                row[value] = parseInt(row[value])
            }
        }
    });
    
    // Create a new array of occupations with 80%+ chance of automation
    let above80 = tableMergeClean.filter((row) => row['Probability'] >= 0.795);
    
    // Initialize an object to store the total employed by state AND top 10 at-risk occupations
    let stateSum = [];
    
    // Loop through the rows to calculate sums for each state
    above80.forEach((row) => {
        for (let state in row) {
            if (
                state !== 'SOC' &&
                state !== 'Occupation' &&
                state !== 'Total Employed' &&
                state !== 'Probability'
            ) {
                stateSum[state] = stateSum[state] || {
                    sum: 0,
                    highRisk: []
                };
                
                // Assemble double that includes top 10 occupations by probability
                if (row[state] > 0) {
                    stateSum[state].sum += row[state];
                    stateSum[state].highRisk.push({
                        occupation: row['Occupation'],
                        probability: row['Probability']
                    });
                }
            }
        }
    });
    
    // Map state names to map keys
    let keyMap = {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'California': 'CA',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Delaware': 'DE',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Pennsylvania': 'PA',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virginia': 'VA',
        'Washington': 'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY'
    };

    // Create an array to hold plot data (key, stateSum, highest risk for automation per state)
    let stateData = [];
    for (let state in stateSum) {
        stateData.push({
            stateKey: keyMap[state],
            stateName: state,
            sum: stateSum[state].sum,
            highRisk: stateSum[state].highRisk.sort((a,b) => b.probability - a.probability).slice(0, 10),
        });
    }
    
    // Log stateData for verification
    console.log("State Data:", stateData);

    $(function() {
        // Code to be executed when the DOM is ready
        const mapData = stateData.map(state => ({
            abbrev: state.stateKey,
            stateName: state.stateName,
            sum: state.sum,
            highRisk: state.highRisk,
        }));
        
        // Log mapData for verification
        console.log("Map Data:", mapData);
                                                
        $.getJSON(
            'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json', function(data){buildChart(data);}
        );
        
        function buildChart(topology){                            
            // Initiate the map chart
            Highcharts.mapChart('container', {
                chart: {
                    map: topology
                },
                title: {
                    text: 'Jobs Lost to Automation: >80% Probability'
                },
                legend: {
                    layout: 'horizontal',
                    borderWidth: 0,
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    floating: true,
                    verticalAlign: 'bottom',
                    y: 25,
                    title: {
                        text: 'Anticipated Number of Jobs Lost per State'
                    }
                },
                mapNavigation: {
                    enabled: true, 
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
                colorAxis: {
                    min: 1,
                    type: 'logarithmic',
                    minColor: '#EEEEFF',
                    maxColor: '#000022',
                    stops: [
                        [0, '#EFEFFF'],
                        [0.67, '#4444FF'],
                        [1, '#000022']
                    ]
                },
                tooltip: {
                    backgroundColor: 'none',
                    borderWidth: 0,
                    shadow: false,
                    useHTML: true,
                    padding: 0,
                    pointFormat: '{point.stateName}: {point.sum}',
                    footerFormat: '<span style="font-size: 10px">(Click for High Risk Jobs)</span>'
                },
                series: [{
                    animation: {
                        duration: 1000
                    },
                    data: mapData,
                    name: 'Jobs Lost to Automation',
                    // Display list of highRisk jobs when selecting a state
                    point: {
                        events: {
                            click: function () {
                                let clickData = stateData.find(data => data.stateName === this.stateName);
                                if (clickData) {
                                    let highRiskList = clickData.highRisk.map(job => job.occupation).join('\n');
                                    let popupContent = `
                                <div style="font-weight: bold; font-size: 16px;">Highest Risk for Automation in ${this.stateName}:</div>
                                ${highRiskList}
                            `;
                                    // alert(alertMessage);
                                }
                            }
                        }
                    },
                    joinBy: ['postal-code', 'abbrev'],
                    dataLabels: {
                        enabled: true,
                        color: '#FFFFFF',
                        format: '{point.abbrev}'
                    },
                }],
            })
        }
    });
});