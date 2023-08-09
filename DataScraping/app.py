from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_data')
def get_data():
    scraped_data = scrape_data()
    return json.dumps({'data': scraped_data})


if __name__ == '__main__':
    app.run(debug=True)