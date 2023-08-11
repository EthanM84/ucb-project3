/// Define the map URL
let topology = 'http://code.highcharts.com/mapdata/countries/us/us-all.topo.json';

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
 // Create the chart
    const data = [
        ['us-ma', 8258520], ['us-wa', 7780380], ['us-ca', 41870530], ['us-or', 4407430],
        ['us-wi', 6937430], ['us-me', 1357720], ['us-mi', 10050440], ['us-nv', 3137150],
        ['us-nm', 1805000], ['us-co', 6292640], ['us-wy', 575970], ['us-ks', 3168370],
        ['us-ne', 2214730], ['us-ok', 3653260], ['us-mo', 6532000], ['us-il', 13847610],
        ['us-in', 7419080], ['us-vt', 598410], ['us-ar', 2843920], ['us-tx', 30871970],
        ['us-ri', 988640], ['us-al', 4738230], ['us-ms', 2620830], ['us-nc', 11011370],
        ['us-va', 8926950], ['us-ia', 3612930], ['us-md', 5919890], ['us-de', 970990],
        ['us-pa', 14166440], ['us-nj', 9219570], ['us-ny', 21470390], ['us-id', 1751740],
        ['us-sd', 977560], ['us-ct', 3788680], ['us-nh', 1461850], ['us-ky', 4397340],
        ['us-oh', 13042610], ['us-tn', 7284770], ['us-wv', 1510230], ['us-la', 4313550],
        ['us-fl', 22194930], ['us-ga', 10571980], ['us-sc', 5153740], ['us-ak', 609670]
        ['us-mn', 6679610], ['us-mt', 1088030], ['us-nd', 878260], ['us-az', 7160880],
        ['us-ut', 3620900], ['us-hi', 1235730]
    ];
    const stateClickData = {
        'Alabama': [
            'Cargo and Freight Agents, 1060',
            'Data Entry Keyers, 1870',
            'Insurance Underwriters, 2870',
            'Library Technicians, 1140',
            'Tax Preparers, 1720',
            'Telemarketers, 4620'
        ],
        'Alaska': [
            'Cargo and Freight Agents, 850',
            'Insurance Underwriters, 210',
            'Library Technicians, 410',
            'New Accounts Clerks, 200',
            'Title Examiners, Abstractors, and Searchers, 200'
        ],
        'Arizona': [
            'Insurance Underwriters, 10880',
            'Data Entry Keyers, 8920',
            'Telemarketers, 6960',
            'Title Examiners, Abstractors, and Searchers, 4740',
            'Tax Preparers, 4180',
            'Cargo and Freight Agents, 3320',
            'Library Technicians, 1710'
        ],
        'Arkansas': [
            'Telemarketers, 2540',
            'Tax Preparers, 2200',
            'Cargo and Freight Agents, 2060',
            'New Accounts Clerks, 1940',
            'Title Examiners, Abstractors, and Searchers, 1650',
            'Data Entry Keyers, 1450',
            'Insurance Underwriters, 840'
        ],
        'California': [
            'Cargo and Freight Agents, 36260',
            'Data Entry Keyers, 34970',
            'Insurance Underwriters, 28590',
            'Tax Preparers, 16600',
            'Library Technicians, 16460',
            'Telemarketers, 14820',
            'Title Examiners, Abstractors, and Searchers, 10080'
        ],
        'Colorado': [
            'Insurance Underwriters, 6250',
            'Library Technicians, 5300',
            'Tax Preparers, 3440',
            'Data Entry Keyers, 3120',
            'Title Examiners, Abstractors, and Searchers, 3120',
            'Cargo and Freight Agents, 1160',
            'New Accounts Clerks, 1060'
        ],
        'Connecticut': [
            'Insurance Underwriters, 10870',
            'Data Entry Keyers, 2810',
            'Tax Preparers, 1670',
            'Cargo and Freight Agents, 1600',
            'Library Technicians, 1260',
            'New Accounts Clerks, 930',
            'Telemarketers, 240'
        ],
        'Delaware': [
            'Tax Preparers, 720',
            'Insurance Underwriters, 460',
            'Library Technicians, 440',
            'New Accounts Clerks, 410',
            'Title Examiners, Abstractors, and Searchers, 290',
            'Data Entry Keyers, 250',
            'Cargo and Freight Agents, 250'
        ],
        'Florida': [
            'Telemarketers, 36810',
            'Data Entry Keyers, 26650',
            'Cargo and Freight Agents, 23270',
            'Insurance Underwriters, 22540',
            'Title Examiners, Abstractors, and Searchers, 14120',
            'Tax Preparers, 13410',
            'Library Technicians, 7290'
        ],
        'Georgia': [
            'Insurance Underwriters, 28490',
            'Telemarketers, 10660',
            'Data Entry Keyers, 8560',
            'Tax Preparers, 5300',
            'Cargo and Freight Agents, 4980',
            'Library Technicians, 3000',
            'Title Examiners, Abstractors, and Searchers, 1190'
        ],
        'Hawaii': [
            'Cargo and Freight Agents, 2880',
            'Insurance Underwriters, 930',
            'Title Examiners, Abstractors, and Searchers, 540',
            'Library Technicians, 470',
            'New Accounts Clerks, 330',
            'Data Entry Keyers, 320'
        ],
        'Illinois': [
            'Insurance Underwriters, 23020',
            'Cargo and Freight Agents, 21490',
            'Data Entry Keyers, 17370',
            'Library Technicians, 8390',
            'Telemarketers, 6870',
            'Tax Preparers, 4670',
            'Title Examiners, Abstractors, and Searchers, 4320'
        ],
        'Indiana': [
            'Telemarketers, 7850',
            'Data Entry Keyers, 6330',
            'Insurance Underwriters, 5630',
            'Tax Preparers, 3440',
            'New Accounts Clerks, 2840',
            'Cargo and Freight Agents, 2800',
            'Title Examiners, Abstractors, and Searchers, 2660'
        ],
        'Iowa': [
            'Insurance Underwriters, 7880',
            'Telemarketers, 4680',
            'New Accounts Clerks, 4220',
            'Cargo and Freight Agents, 2420',
            'Library Technicians, 2050',
            'Data Entry Keyers, 1510',
            'Tax Preparers, 1240'
        ],
        'Kansas': [
            'Insurance Underwriters, 6720',
            'New Accounts Clerks, 3070',
            'Data Entry Keyers, 2370',
            'Library Technicians, 1930',
            'Cargo and Freight Agents, 1510',
            'Tax Preparers, 1160',
            'Title Examiners, Abstractors, and Searchers, 680'
        ],
        'Kentucky': [
            'Cargo and Freight Agents, 5840',
            'Data Entry Keyers, 3100',
            'New Accounts Clerks, 2680',
            'Library Technicians, 2390',
            'Tax Preparers, 1400',
            'Insurance Underwriters, 420',
            'Title Examiners, Abstractors, and Searchers, 260'
        ],
        'Louisiana': [
            'Library Technicians, 3830',
            'Data Entry Keyers, 3440',
            'Insurance Underwriters, 2680',
            'Tax Preparers, 2070',
            'Cargo and Freight Agents, 990',
            'Title Examiners, Abstractors, and Searchers, 870',
            'New Accounts Clerks, 510'
        ],
    };

    Highcharts.mapChart('container', {
        chart: {map: topology},
        title: {text: 'Jobs Lost to Automation: Impact by State'},
        subtitle: {text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/us/us-all.topo.json">United States of America</a>'},
        mapNavigation: {enabled: true, buttonOptions: {verticalAlign: 'bottom'}},
        colorAxis: {min: 0},
        series: [{
            data: data,
            name: 'Random data',
            states: {hover: {color: '#BADA55'}},
            dataLabels: {enabled: true, format: '{point.name}'},
            events: {
                // Callback for click event on a state
                click: function (event) {
                    let stateName = Object.keys(stateKeyMap).find(key => stateKeyMap[key] === event.point.stateKey);
                    let topOccupations = stateClickData[stateName];

                    // Display additional information, e.g., in an alert
                    alert(`State: ${stateName}\nHigh Risk Occupations:\nTop Occupations:\n${topOccupations.join('\n')}`);
                }
            }
        }]
    });
})
    
