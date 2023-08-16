// Use PapaParse to parse the CSV data
function parseCSV(csvData) {
    let parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
    });
    return parsedData.data;
}

// Log a message to indicate the parsing process is starting
console.log("Parsing CSV files...");

// Load the CSV files using jQuery's $.get method
$.when(
    $.get('Resources/occupation_salary_2.csv'),
    $.get('Resources/automation_data_by_state_2.csv'))
.done(function(occSalaryCSV, autoDataCSV) {
    
    // Log to indicate that CSV loading is complete
    console.log("CSV files loaded.");
    
    // Parse the CSV data using the parseCSV function
    let occSalary = parseCSV(occSalaryCSV[0]);
    let autoData = parseCSV(autoDataCSV[0]);
    
    // Log parsed data for verification
    console.log("Parsed Automation Data:", autoData);
        
    // Rename columns from Table 1 for merge prep
    occSalary = occSalary.map(row => ({
        ...row,
        'SOC': row['OCC_CODE'],
        'Occupation': row['OCC_TITLE'],
        'Total Employed': row['TOT_EMP'],
        'Mean Salary': row['A_MEAN']
    }));
    
    // Log parsed data for verification
    console.log("Parsed Occupation Salary Data:", occSalary);
        
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
    
    // Log merged data array for verification
    console.log("Merged Tables Data:", tableMerge);
    
    // Convert "Probability" values to decimal
    let tableMergeClean = tableMerge.map(row => ({
        ...row,
        'Probability': parseFloat(row['Probability'])
    }));
    
    // Log CLEAN merged data array for verification
    console.log("Merged with converted data type:", tableMergeClean);

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
                stateSum[state] = (stateSum[state] || {
                    sum: 0,
                    highRisk: []
                });
                
                // Store 10 occupations with highest risk for automation per state
                if (row[state] > 0) {
                    stateSum[state].highRisk.push({
                        occupation: row['Occupation'],
                    });
                }
            }
        }
    });
    
    // Map state names to map keys
    let keyMap = {
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
        'Wyoming': 'us-wy'
    };

    // Create an array to hold plot data (key, stateSum, highest risk for automation per state)
    let stateData = [];
    for (let state in stateSum) {
        stateData.push({
            stateKey: keyMap[state],
            sum: stateSum[state].sum,
            highRisk: stateSum[state].highRisk.sort((a,b) => b.probability - a.probability).slice(0, 10),
        });
    }
    
    // Log stateData for verification
    console.log("State Data:", stateData);
       
    // Convert map to array
    const mapData = stateData.map(({stateKey, sum }) => [stateKey, sum]);
    
    // // Log mapData for verification
    // console.log("Map Data:", mapData);
    
    let topology = 'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json';
    
    // // Log the map URL for verification
    // console.log("Map Topology URL:", topology);
    
    // Fetch the TopoJSON file
    fetch(topology)
      .then(response => response.json())
      .then(topoData => {
        // Convert TopoJSON to GeoJSON
        let geoData = topojson.feature(topoData, topoData.objects.states);
                  
        // Create the chart
        Highcharts.mapChart('container', {
            chart: {map: geoData},
            title: {text: 'Jobs Lost to Automation: Impact by State'},
            mapNavigation: {
                enabled: true, 
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            colorAxis: {
                min: 0
            },
            series: [{
                data: mapData,
                name: 'Jobs Lost to Automation',
                joinBy: 'stateKey',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },
                events: {
                    // Callback for click event on a state
                    click: function (event) {
                        let stateName = Object.keys(keyMap).find(key => keyMap[key] === event.point.stateKey);
                        let highRisk = stateData.find(({stateKey}) => stateKey === event.point.stateKey).highRisk;
                        // List occupations most impacted when clicked
                        alert(`State: ${stateName}\nHighest Risk for Automation:\nTop 10:\n${highRisk.map(({occupation}) => occupation).join('\n')}`
                        );
                    }
                }
            }]
        });
    })
});