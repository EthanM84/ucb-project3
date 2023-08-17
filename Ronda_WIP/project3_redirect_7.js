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
let stateData = [
    {stateKey: "us-al",
     sum: 2104270,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians",  probability: 0.99},
         {occupation: "New Accounts Clerks",  probability: 0.99},
         {occupation: "Photographic Process Workers and Processing Machine Operators",        probability: 0.99},
         {occupation: "Tax Preparers",  probability: 0.99},
         {occupation: "Telemarketers",  probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99},
         {occupation: "Bookkeeping, Accounting, and Auditing Clerks", probability: 0.98}
     ]
    },
    {stateKey: "us-ak",
     sum: 233740,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99},
         {occupation: "Bookkeeping, Accounting, and Auditing Clerks", probability: 0.98},
         {occupation: "Claims Adjusters, Examiners, and Investigators", probability: 0.98},
         {occupation: "Driver/Sales Workers", probability: 0.98},
         {occupation: "Inspectors, Testers, Sorters, Samplers, and Weighers", probability: 0.98},
         {occupation: "Insurance Claims and Policy Processing Clerks", probability: 0.98}
     ]
    },
    {stateKey: "us-az",
     sum: 2905720,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99},
         {occupation: "Bookkeeping, Accounting, and Auditing Clerks", probability: 0.98},
         {occupation: "Claims Adjusters, Examiners, and Investigators", probability: 0.98}
     ]
    },
    {stateKey: "us-ar",
     sum: 1238970,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99},
         {occupation: "Bookkeeping, Accounting, and Auditing Clerks", probability: 0.98},
         {occupation: "Brokerage Clerks", probability: 0.98}
     ]
    },
    {stateKey: "us-ca",
     sum: 16174910,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Photographic Process Workers and Processing Machine Operators", probability: 0.99},
         {occupation: "Sewers, Hand", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99}
     ]
    },
    {stateKey: "us-co",
     sum: 2569620,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Photographic Process Workers and Processing Machine Operators", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99},
         {occupation: "Watch and Clock Repairers", probability: 0.99}
     ]
    },
    {stateKey: "us-ct",
     sum: 1410070,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Bookkeeping, Accounting, and Auditing Clerks", probability: 0.98},
         {occupation: "Brokerage Clerks", probability: 0.98},
         {occupation: "Claims Adjusters, Examiners, and Investigators", probability: 0.98}
     ]
    },
    {stateKey: "us-de",
     sum: 408370,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99},
         {occupation: "Bookkeeping, Accounting, and Auditing Clerks", probability: 0.98},
         {occupation: "Brokerage Clerks", probability: 0.98}
     ]
    },
    {stateKey: "us-fl",
     sum: 9538630,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Photographic Process Workers and Processing Machine Operators", probability: 0.99},
         {occupation: "Sewers, Hand", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99}
     ]
    },
    {stateKey: "us-ga",
     sum: 4643530,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Photographic Process Workers and Processing Machine Operators", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99},
         {occupation: "Watch and Clock Repairers", probability: 0.99}
     ]
    },
    {stateKey: "us-hi",
     sum: 520000,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99},
         {occupation: "Bookkeeping, Accounting, and Auditing Clerks", probability: 0.98},
         {occupation: "Brokerage Clerks", probability: 0.98},
         {occupation: "Claims Adjusters, Examiners, and Investigators", probability: 0.98},
         {occupation: "Credit Analysts", probability: 0.98}
     ]
    },
    {stateKey: "us-id",
     sum: 720140,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99},
         {occupation: "Bookkeeping, Accounting, and Auditing Clerks", probability: 0.98},
         {occupation: "Brokerage Clerks", probability: 0.98}
     ]
    },
    {stateKey: "us-il",
     sum: 5774210,
     highRisk: [
          {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99},
         {occupation: "Bookkeeping, Accounting, and Auditing Clerks", probability: 0.98},
         {occupation: "Brokerage Clerks", probability: 0.98}
     ]
    },
    {stateKey: "us-in",
     sum: 3363850,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Photographic Process Workers and Processing Machine Operators", probability: 0.99},
         {occupation: "Sewers, Hand", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99}
     ]
    },
    {stateKey: "us-ia",
     sum: 1539980,
     highRisk: [
         {occupation: "Cargo and Freight Agents", probability: 0.99},
         {occupation: "Data Entry Keyers", probability: 0.99},
         {occupation: "Insurance Underwriters", probability: 0.99},
         {occupation: "Library Technicians", probability: 0.99},
         {occupation: "New Accounts Clerks", probability: 0.99},
         {occupation: "Tax Preparers", probability: 0.99},
         {occupation: "Telemarketers", probability: 0.99},
         {occupation: "Title Examiners, Abstractors, and Searchers", probability: 0.99},
         {occupation: "Bookkeeping, Accounting, and Auditing Clerks", probability: 0.98},
         {occupation: "Brokerage Clerks", probability: 0.98}
     ]
    },
];
 
$(document).ready(function() {
    // Code to be executed when the DOM is ready
    const mapData = stateData.map(({stateKey, sum }) => [stateKey, sum]);

    let topology = 'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json';

    // Initiate the map chart
    let mapChart = Highcharts.mapChart('container', {
        chart: {map: topology},
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
        tooltip: {
            footerFormat: '<span style="font-size: 10px">(Click for High Risk Jobs)</span>'
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
                    console.log("Clicked stateKey:", event.point.stateKey);
                    let stateName = Object.keys(keyMap).find(key => keyMap[key] === event.point.stateKey);
                    console.log("Mapped stateName:", stateName);
                    let highRisk = stateData.find(({stateKey}) => stateKey === event.point.stateKey).highRisk;
                    console.log("High Risk data:", highRisk);
                    // List occupations most impacted when clicked
                    alert(`State: ${stateName}\nHighest Risk for Automation:\nTop 10:\n${highRisk.map(({occupation}) => occupation).join('\n')}`
                    );
                }
            }
        }]
    });
});