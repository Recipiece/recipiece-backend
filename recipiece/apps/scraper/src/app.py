from http import HTTPStatus
from flask import Flask, request
from api import scraper

def setup_app():
    app = Flask(__name__)

    @app.route('/scrape', methods=['POST'])
    def scrape_recipe():
        body = request.json
        url_to_scrape = body['url']

        return scraper.scrape_recipe(url_to_scrape)

    return app

