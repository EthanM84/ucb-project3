import requests
from bs4 import BeautifulSoup as bs

def scrape():
    url = 'https://www.bls.gov/oes/current/oes_nat.htm'
    response = requests.get(url)

    if response.status_code == 200:
        soup = bs(response.content, 'html.parser')
        data_table = soup.find('table', class_='regular')

        # Get the column headers
        headers = data_table.find('thead').find_all('th')
        column_headers = [header.text.strip() for header in headers]

        # Initialize the data list to store the scraped data
        scraped_data = []

        # Get the rows of the table
        rows = data_table.find('tbody').find_all('tr')
        for row in rows:
            columns = row.find_all('td')
            row_data = {
                column_headers[0]: columns[0].text.strip(),
                column_headers[1]: columns[1].text.strip(),
                column_headers[2]: columns[2].text.strip(),
                column_headers[3]: columns[3].text.strip(),
                column_headers[4]: columns[4].text.strip(),
                column_headers[5]: columns[5].text.strip()
            }
            scraped_data.append(row_data)

        return scraped_data
    else:
        print("Error fetching data:", response.status_code)
        return []

# Test the scraper
if __name__ == "__main__":
    data = scrape()
    print(data)
