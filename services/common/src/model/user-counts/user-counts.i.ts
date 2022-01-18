import { IUserOwnedModel } from '../user-owned-model.i';

export interface IUserCounts extends IUserOwnedModel {
  recipes: number;
  recipeBooks: number;
  shoppingLists: number;
}
