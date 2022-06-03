declare namespace Recipiece {
  declare interface Recipe {
    readonly id?: number;
    readonly owner_id?: number;
    readonly name: string;
    readonly description: string;
    readonly private: boolean;
    readonly advanced_config: any;
    readonly tags: string[];
    readonly sections: RecipeSection[];
  }

  declare interface RecipeSection {
    readonly id?: number;
    readonly recipe_id?: number;
    readonly name: string;
    readonly ingredients: RecipeIngredient[];
    readonly steps: RecipeStep[];
  }

  declare interface RecipeIngredient {
    readonly id?: number;
    readonly recipe_section_id?: number;
    readonly unit?: string;
    readonly amount: string;
    readonly name: string;
  }

  declare interface RecipeStep {
    readonly id?: number;
    readonly recipe_section_id?: number;
    readonly content: string;
    readonly time_ms?: number;
  }

  declare interface ShoppingList {
    readonly id?: number;
    readonly owner_id?: number;
    readonly name: string;
    readonly description: string;
    readonly items: ShoppingListItem[];
  }

  declare interface ShoppingListItem {
    readonly id?: number;
    readonly shopping_list_id?: number;
    readonly name: string;
    readonly ordinal: number;
    readonly checked: boolean;
    readonly category: string;
  }
}
