import { IUserOwnedModel } from '../user-owned-model.i';

export type RecipeStepLengthUnit = 'h' | 'm' | 's' | 'd';


export interface IRecipeStepLength {
  time: number;
  unit: RecipeStepLengthUnit;
}


export interface IRecipeStep {
  content: string;
  length: IRecipeStepLength;
}


export interface IRecipeIngredient {
  name: string;
  amount: string;
  unit?: string;
  commonMatch?: string;
  converted?: string;
}


export interface IRecipeAdvancedOptions {
  highAltitude?: boolean;
  altitude?: number;
}


export interface IRecipeSection {
  id: string;
  name: string;
  steps: IRecipeStep[];
  ingredients: IRecipeIngredient[];
}


export interface IRecipe extends IUserOwnedModel {
  name: string;
  description: string;
  private: boolean;
  advanced?: IRecipeAdvancedOptions;
  sections: IRecipeSection[];
  tags: string[];
}
