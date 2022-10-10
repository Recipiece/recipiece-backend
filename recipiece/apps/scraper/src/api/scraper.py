from typing import List
import requests
from model.recipe import ScrapedRecipe, ScrapedRecipeSection, ScrapedRecipeIngredient
from recipe_scrapers import scrape_me, AbstractScraper
from util.logging import get_logger
from werkzeug.exceptions import NotAcceptable
# from parse_ingredients import parse_ingredient


logger = get_logger(__name__)


def scrape_recipe(url: str) -> ScrapedRecipe:
    try:
        scraper = scrape_me(url, wild_mode=True)
    except Exception as ex:
        logger.warning(f'Failed to parse recipe {url}')
        logger.exception(ex)
        raise NotAcceptable()

    try:
        title = scraper.title()
    except:
        title = url

    try:
        description = scraper.description()
    except:
        description = ''

    try:
        scraped_ingredients = scraper.ingredients()
    except:
        scraped_ingredients = []

    try:
        scraped_steps = scraper.instructions_list()
    except:
        scraped_steps = []
    
    description += f'\nSourced from {url}'
    description = description.strip()

    sections = [
        ScrapedRecipeSection(
            name=title,
            ingredients=[{'content': ing} for ing in scraped_ingredients],
            steps=[{'content': step} for step in scraped_steps],
        )
    ]

    return ScrapedRecipe(
        name=title,
        description=description,
        sections=sections,
    )
