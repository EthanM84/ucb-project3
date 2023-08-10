// Create an array of each country's numbers
let cargoandfreight = Object.values(data.cargoandfreight);
let dataentrykeyers = Object.values(data.dataentrykeyers);
let insurance_underwriters = Object.values(data.insruance_underwriters);
let library_techs = Object.values(data.library_techs);
let new_account_clerks = Object.values(data.new_account_clerks);
let photo_process = Object.values(data.photo_process);
let sewers_hand = Object.values(data.sewers_hand);
let tax_prep = Object.values(data.tax_prep;
let telemarketers = Object.values(data.telemarketers);

// Create an array of category labels/ 
let labels = Object.keys(data.highestprobablityprofs);

// Display the default plot
function init() {
  let data = [{
    values: ,
    labels: labels, occupation, states
    type: "pie"
  }];

  let layout = {
    height: 600,
    width: 800
  };

  Plotly.newPlot("pie", data, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  
    let dropdownMenu = d3.select("#selDataset");
  
    // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
 

  if (dataset == 'cargoandfrieght') {
      data = cargoandfrieght;
  }
  else if (dataset == ' dataentrykeyers') {
      data =  dataentrykeyers;
  }
  else if (dataset == 'insurance_underwriters') {
      data = insurance_underwriters;
  }
  else if (dataset == 'library_techs)} {
    { data = ilibrary_techs;
  }
  else if (dataset == 'new_account_clerks') {
      data = new_account_clerks;
  }
  else if (dataset == 'photo_process') {
    data = photo_process;

   } else if (dataset == 'sewers_hand') {
        data = sewers_hand;
    
  }
} else if (dataset == 'tax_prep') {
    data = tax_prep;

} else if (dataset == 'telemarketers') {
    data = telemarketers;

}

// Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();