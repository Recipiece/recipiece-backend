import { IUserOwnedModel } from 'recipiece-common';

export interface IUserCounts extends IUserOwnedModel {
  recipes: number;
  recipeBooks: number;
  shoppingLists: number;
}
