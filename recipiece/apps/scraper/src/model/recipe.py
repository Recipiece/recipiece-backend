from typing import List, Optional, TypedDict


class ScrapedRecipeStep(TypedDict):
    content: str
    time_ms: Optional[int]


class ScrapedRecipeIngredient(TypedDict):
    content: str


class ScrapedRecipeSection(TypedDict):
    name: str
    ingredients: List[ScrapedRecipeIngredient]
    steps: List[ScrapedRecipeStep]


class ScrapedRecipe(TypedDict):
    name: str
    description: str
    sections: List[ScrapedRecipeSection]
