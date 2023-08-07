import requests
from bs4 import BeautifulSoup

def scrape_data():
    url = 'https://www.bls.gov/opub/mlr/2022/article/growth-trends-for-selected-occupations-considered-at-risk-from-automation.htm'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Assuming the scraped data is in a <div> with a specific class or ID
    scraped_data = soup.find('span', class_='tableTitle').text.strip()

    return scraped_data
