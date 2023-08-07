document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch the scraped data from the Flask backend
    async function fetchData() {
        try {
            const response = await fetch('/get_data');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return 'Error: Failed to fetch data.';
        }
    }

    // Function to update the scraped data on the page
    async function updateScrapedData() {
        const scrapedDataElement = document.getElementById('scraped-data');
        const scrapedData = await fetchData();
        scrapedDataElement.textContent = scrapedData;
    }

    // Call the function to update the scraped data on page load
    updateScrapedData();

    // Toggle the dropdown menu
    function toggleDropdown() {
        const dropdownMenu = document.getElementById('dropdown-menu');
        dropdownMenu.classList.toggle('show');
    }

    // Close the dropdown menu when clicking outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropdown button')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };
});
