async function updateScrapedData() {
    const scrapedDataElement = document.querySelector('#scraped-data tbody');
    scrapedDataElement.innerHTML = ''; // Clear existing rows from the table body

    const scrapedData = await fetchData();
    scrapedData.forEach((dataRow) => {
        const row = document.createElement('tr');
        Object.values(dataRow).forEach((value) => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        scrapedDataElement.appendChild(row);
    });
}

async function fetchData() {
    try {
        const response = await fetch('/get_data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Initial update when the page loads
updateScrapedData();
