import requests
from bs4 import BeautifulSoup as bs
from splinter import Browser

def scrape():
    url = 'https://www.bls.gov/oes/current/oes_nat.htm'
    browser = Browser('chrome', headless=True)

    # News URL
    browser.visit(url)
    time.sleep(1)

    html = browser.html
    response = bs(html, 'html.parser')
    print(response)
    # if response.status_code == 200:
    #     soup = bs(response.content, 'html.parser')
    data_table = response.find('table', class_='regular')
    print(data_table)
    #     # Get the column headers
    headers = data_table.find('thead').find_all('th')
    print(headers)
    column_headers = [header.text.strip() for header in headers]
    print(column_headers)
    #     # Initialize the data list to store the scraped data
    #     scraped_data = []

    #     # Get the rows of the table
    #     rows = data_table.find('tbody').find_all('tr')
    #     print(rows)
    #     for row in rows:
    #         columns = row.find_all('td')
    #         print(columns)
    #         #row_data = {
    #         #row_data = [column.get_text() for column in columns]
    #             # column_headers[0]: columns[0].text.strip(),
    #             # column_headers[1]: columns[1].text.strip(),
    #             # column_headers[2]: columns[2].text.strip(),
    #             # column_headers[3]: columns[3].text.strip(),
    #             # column_headers[4]: columns[4].text.strip(),
    #             # column_headers[5]: columns[5].text.strip()
    #        # }
    #         #print(row_data)
    #         #scraped_data.append(row_data)

    #     return scraped_data
    # else:
    #     print("Error fetching data:", response.status_code)
    #     return []
scrape()

# Test the scraper
# if __name__ == "__main__":
#     scrape(debug=True)
   # print(data)
