import { parse } from '@mealprime/recipe-ingredient-parser';
import { Injectable } from '@nestjs/common';
import { Recipiece } from '@recipiece/database';

@Injectable()
export class RecipeProcessorService {
  public processIngredients(ingredients: Recipiece.RecipeIngredient[]): Recipiece.RecipeIngredient[] {
    return ingredients.map((i) => {
      const parsedIng = parse(i.content);

      return {
        ordinal: i.ordinal,
        content: i.content,
        name: parsedIng.ingredient || '',
        amount: parsedIng.quantity || '',
        unit: parsedIng.unit || '',
      };
    });
  }

  public processSectionIngredients(section: Recipiece.RecipeSection): Recipiece.RecipeSection {
    return {
      ...section,
      ingredients: this.processIngredients(section.ingredients),
    };
  }

  public processRecipeIngredients(recipe: Recipiece.Recipe): Recipiece.Recipe {
    return {
      ...recipe,
      sections: recipe.sections.map((s) => this.processSectionIngredients(s)),
    };
  }
}
