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
    
    // Rename columns in Table 2 for readability
    autoData = autoData.map(row => ({
        ...row,
        'OCC_Code': row['ï»¿SOC']}));
    
    // Merge tables on 'Occupation'
    let tableMerge = autoData.map(autoRow => ({
        ...autoRow,
        ...occSalary.find(occRow => occRow['Occupation'] === autoRow['Occupation'])}));
    
    // Drop superfluous columns
    let tableMergeClean = tableMerge.map(row => {
        delete row['OCC_CODE'];
        delete row['OCC_GROUP'];
        delete row['District of Columbia'];
        delete row['Guam'];
        delete row['Puerto Rico'];
        delete row['Virgin Islands'];
        return row;});
    
    // Convert "Mean Salary" and "Probability" columns to numeric
    tableMergeClean = tableMergeClean.map(row => ({
        ...row,
        'Mean Salary': parseFloat(row['Mean Salary']),
        'Probability': parseFloat(row['Probability'])}));

    // Round "Mean Salary" to the nearest whole dollar amount
    tableMergeClean.forEach(row => {
    row['Mean Salary'] = Math.round(row['Mean Salary']);});
    
    // Create a new array with Probability >= 0.80
    let above80 = tableMergeClean.filter(row => row['Probability'] >= 0.80);

    // Eliminate unnecessary columns
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
                plotByStateSum[key] = (plotByStateSum[key] || 0) + parseFloat(row[key]);}});});
    
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
