from flask import Flask, render_template, jsonify
from scraper import scrape

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_data')
def get_data():
    scraped_data = scrape()
    return jsonify(scraped_data)

if __name__ == '__main__':
    app.run(debug=True)
