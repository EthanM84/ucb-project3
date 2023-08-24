// Use PapaParse to parse the CSV data
function parseCSV(csvData) {
  let parsedData = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });

  return parsedData.data;
}

// Load the CSV files using jQuery's $.get method
$.when(
  $.get("Resources/occupation_salary_2.csv"), ////// change this to point to your director
  $.get("Resources/automation_data_by_state_2.csv") ////// change this to point to your director
).done(function (occSalaryCSV, autoDataCSV) {
  // Parse the CSV data using the parseCSV function
  let occSalary = parseCSV(occSalaryCSV[0]);
  let autoData = parseCSV(autoDataCSV[0]);

  // Rename columns in Table 1 for merge prep
  occSalary = occSalary.map((row) => ({
    ...row,
    Occupation: row["OCC_TITLE"],
    "Total Employed": row["TOT_EMP"],
    "Mean Salary": row["A_MEAN"],
  }));
  console.log("autoData", autoData);
  // Replace double hyphens with single hyphens in Occupation values
  occSalary = occSalary.map((row) => ({
    ...row,
    Occupation: row["Occupation"].replace("--", "-"),
  }));
  autoData = autoData.map((row) => ({
    ...row,
    Occupation: row["Occupation"].replace("--", "-"),
  }));

  // Merge tables on 'Occupation'
  let tableMerge = autoData.map((autoRow) => {
    let occRow = occSalary.find(
      (occRow) => occRow["Occupation"] === autoRow["Occupation"]
    );
    // console.log('autoRow:', autoRow);
    // console.log('occRow:', occRow);
    return {
      Occupation: autoRow["Occupation"],
      Probability: autoRow["Probability"],
      Alabama: autoRow["Alabama"],
      Alaska: autoRow["Alaska"],
      Arizona: autoRow["Arizona"],
      Arkansas: autoRow["Arkansas"],
      California: autoRow["California"],
      Colorado: autoRow["Colorado"],
      Connecticut: autoRow["Connecticut"],
      Delaware: autoRow["Delaware"],
      Florida: autoRow["Florida"],
      Georgia: autoRow["Georgia"],
      Hawaii: autoRow["Hawaii"],
      Idaho: autoRow["Idaho"],
      Illinois: autoRow["Illinois"],
      Indiana: autoRow["Indiana"],
      Iowa: autoRow["Iowa"],
      Kansas: autoRow["Kansas"],
      Kentucky: autoRow["Kentucky"],
      Louisiana: autoRow["Louisiana"],
      Maine: autoRow["Maine"],
      Maryland: autoRow["Maryland"],
      Massachusetts: autoRow["Massachusetts"],
      Michigan: autoRow["Michigan"],
      Minnesota: autoRow["Minnesota"],
      Mississippi: autoRow["Mississippi"],
      Missouri: autoRow["Missouri"],
      Montana: autoRow["Montana"],
      Nebraska: autoRow["Nebraska"],
      Nevada: autoRow["Nevada"],
      "New Hampshire": autoRow["New Hampshire"],
      "New Jersey": autoRow["New Jersey"],
      "New Mexico": autoRow["New Mexico"],
      "New York": autoRow["New York"],
      "North Carolina": autoRow["North Carolina"],
      "North Dakota": autoRow["North Dakota"],
      Ohio: autoRow["Ohio"],
      Oklahoma: autoRow["Oklahoma"],
      Oregon: autoRow["Oregon"],
      Pennsylvania: autoRow["Pennsylvania"],
      "Rhode Island": autoRow["Rhode Island"],
      "South Carolina": autoRow["South Carolina"],
      "South Dakota": autoRow["South Dakota"],
      Tennessee: autoRow["Tennessee"],
      Texas: autoRow["Texas"],
      Utah: autoRow["Utah"],
      Vermont: autoRow["Vermont"],
      Virginia: autoRow["Virginia"],
      Washington: autoRow["Washington"],
      "West Virginia": autoRow["West Virginia"],
      Wisconsin: autoRow["Wisconsin"],
      Wyoming: autoRow["Wyoming"],
      "Total Employed": occRow["Total Employed"],
    };
  });

  // Convert "Mean Salary" and "Probability" columns to numeric
  let tableMergeClean = tableMerge.map((row) => ({
    ///////////  changed this *****tableMergeClean.map********* to *******tableMerge.map******* only to fix decelaration error   not sure its right /////////
    ...row,
    "Mean Salary": parseFloat(row["Mean Salary"]),
    Probability: parseFloat(row["Probability"]),
  }));

  // Round "Mean Salary" to the nearest whole dollar amount
  tableMergeClean.forEach((row) => {
    row["Mean Salary"] = Math.round(row["Mean Salary"]);
  });

  // Create a new array with Probability >= 0.80
  let above80 = tableMergeClean.filter((row) => row["Probability"] >= 0.8);

  // Initialize an object to store the sums and top 10 occupations of each state column
  let stateData = {};

  // Loop through the tableMerge data to calculate sums and Top 10
  above80.forEach((row) => {
    // Loop through each state column and sum the values
    for (let state in row) {
      if (
        state !== "Occupation" &&
        state !== "Total Employed" &&
        state !== "Mean Salary" &&
        state !== "Probability"
      ) {
        stateData[state] = stateData[state] || {
          sum: 0,
          topOccupations: [],
        };
        stateData[state].sum += parseFloat(row[state]);

        // Collect top occupations with highest probability
        if (row[state] > 0) {
          stateData[state].topOccupations.push({
            occupation: row["Occupation"],
            probability: parseFloat(row[state]),
          });
        }
      }
    }
  });

  // Create an array to hold the state-sum trio
  let stateSumOcc = [];

  let stateKeyMap = {
    /////////////// moved it before the for loop below to fix declaration error
    Alabama: "us-al",
    Alaska: "us-ak",
    Arizona: "us-az",
    Arkansas: "us-ar",
    California: "us-ca",
    Colorado: "us-co",
    Connecticut: "us-ct",
    Delaware: "us-de",
    Florida: "us-fl",
    Georgia: "us-ga",
    Hawaii: "us-hi",
    Idaho: "us-id",
    Illinois: "us-il",
    Indiana: "us-in",
    Iowa: "us-ia",
    Kansas: "us-ks",
    Kentucky: "us-ky",
    Louisiana: "us-la",
    Maine: "us-me",
    Maryland: "us-md",
    Massachusetts: "us-ma",
    Michigan: "us-mi",
    Minnesota: "us-mn",
    Mississippi: "us-ms",
    Missouri: "us-mo",
    Montana: "us-mt",
    Nebraska: "us-ne",
    Nevada: "us-nv",
    "New Hampshire": "us-nh",
    "New Jersey": "us-nj",
    "New Mexico": "us-nm",
    "New York": "us-ny",
    "North Carolina": "us-nc",
    "North Dakota": "us-nd",
    Ohio: "us-oh",
    Oklahoma: "us-ok",
    Oregon: "us-or",
    Pennsylvania: "us-pa",
    "Rhode Island": "us-ri",
    "South Carolina": "us-sc",
    "South Dakota": "us-sd",
    Tennessee: "us-tn",
    Texas: "us-tx",
    Utah: "us-ut",
    Vermont: "us-vt",
    Virginia: "us-va",
    Washington: "us-wa",
    "West Virginia": "us-wv",
    Wisconsin: "us-wi",
    Wyoming: "us-wy",
  };

  // Convert the state sums object into an array of triples
  for (let state in stateData) {
    stateSumOcc.push({
      stateKey: stateKeyMap[state],
      sum: stateData[state].sum,
      topOccupations: stateData[state].topOccupations
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 10),
    });
  }

  // Create a mapping of state names to map keys

  ///////////    *************   data doesnt look right

  //// Format the data for Highcharts Map
  const data = stateSumOcc.map(({ stateKey, sum }) => [stateKey, sum]);
  console.log("your data that is passed to the map", data);

  ///////////    *************   data doesnt look right

  /////////////////////////   *********      Modified Part to display map       *******           ////////////////////////////

  ////// sample data below works fine /////////////

  //   const data = [
  //     ["gl", 10],
  //     ["lc", 11],
  //     ["um", 12],
  //     ["us", 13],
  //     ["vi", 14],
  //     ["ca", 15],
  //     ["cu", 16],
  //     ["kn", 17],
  //     ["ni", 18],
  //     ["gd", 19],
  //     ["dm", 20],
  //     ["ag", 21],
  //     ["tt", 22],
  //     ["sw", 23],
  //     ["bb", 24],
  //     ["jm", 25],
  //     ["bu", 26],
  //     ["bs", 27],
  //     ["vc", 28],
  //     ["ht", 29],
  //     ["sv", 30],
  //     ["hn", 31],
  //     ["do", 32],
  //     ["mx", 33],
  //     ["bz", 34],
  //     ["gt", 35],
  //     ["cr", 36],
  //     ["pr", 37],
  //     ["pa", 38],
  //   ];

  ////// sample data above works fine /////////////

  // (async () => {
  //   ////////// adding asysnc to be able to use await while fetching topology to solve promise issue

  //   const topology = await fetch(
  //     //////////////////        **await**       can only be used with async function
  //     "https://code.highcharts.com/mapdata/custom/north-america.topo.json"
  //   ).then((response) => response.json());
  //   console.log("topology data", topology);

  //   //////////////////////////////////////////////              unchanged code       ////////////////////////

  //   // Create the chart
  //   Highcharts.mapChart("container", {
  //     chart: { map: topology }, // here you map uses topology and it wasn't called in your code
  //     title: { text: "Jobs Lost to Automation: Impact by State" },
  //     subtitle: {
  //       text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/us/us-all.topo.json">United States of America</a>',
  //     },
  //     mapNavigation: {
  //       enabled: true,
  //       buttonOptions: { verticalAlign: "bottom" },
  //     },
  //     colorAxis: { min: 0 },
  //     series: [
  //       {
  //         data: data,
  //         name: "Random data",
  //         states: { hover: { color: "#BADA55" } },
  //         dataLabels: { enabled: true, format: "{point.name}" },
  //         events: {
  //           // Callback for click event on a state
  //           click: function (event) {
  //             let stateName = Object.keys(stateKeyMap).find(
  //               (key) => stateKeyMap[key] === event.point.stateKey
  //             );
  //             let topOccupations = event.point.topOccupations.map(
  //               (occ) => `${occ.occupation}: ${occ.probability}%`
  //             );

  //             // Display additional information, e.g., in an alert
  //             alert(
  //               `State: ${stateName}\nTotal: ${
  //                 event.point.sum
  //               }\nTop Occupations:\n${topOccupations.join("\n")}`
  //             );
  //           },
  //         },
  //       },
  //     ],
  //   });

  //   //////////////////////////////////////////////          Unchanged part ends           ////////////////
  // })(); ////////////        **** closing async and calling it () ****     //////////

  /////////////////////////   *********      Modified Part that display map Ends      *******           ////////////////////////////

  //////////////////        ********** removed async part of your code that shows the promise issue    ********             /////////////
  // const topology = fetch(
  //   /////////////////////    removed await as it wonly works with async function
  //   "https://code.highcharts.com/mapdata/custom/north-america.topo.json"
  // ).then((response) => response.json());
  // console.log("topology data", topology); ////////////////// check the promise issue in console

  // ////////////////////////////////////////////              unchanged code       ////////////////////////

  //////////////// Adding jQuery code //////////////////////////////////

  $.getJSON(
    "https://code.highcharts.com/mapdata/countries/us/us-all.topo.json",
    function (topology) {
      ////////////////////////////////////// JQuery code
      /////// Create the chart
      Highcharts.mapChart("container", {
        chart: { map: topology }, // here you map uses topology and it wasn't called in your code
        title: { text: "Jobs Lost to Automation: Impact by State" },
        subtitle: {
          text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/us/us-all.topo.json">United States of America</a>',
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: { verticalAlign: "bottom" },
        },
        colorAxis: { min: 0 },
        series: [
          {
            data: data,
            name: "Random data",
            states: { hover: { color: "#BADA55" } },
            dataLabels: { enabled: true, format: "{point.name}" },
            events: {
              // Callback for click event on a state
              click: function (event) {
                let stateName = Object.keys(stateKeyMap).find(
                  (key) => stateKeyMap[key] === event.point.stateKey
                );
                let topOccupations = event.point.topOccupations.map(
                  (occ) => `${occ.occupation}: ${occ.probability}%`
                );
                  
                // Display additional information, e.g., in an alert
                alert(
                  `State: ${stateName}\nTotal: ${
                    event.point.sum
                  }\nTop Occupations:\n${topOccupations.join("\n")}`
                );
              },
            },
          },
        ],
      });
      //////////////////////////////////////////////          Unchanged part ends           ////////////////
    }
  );
});