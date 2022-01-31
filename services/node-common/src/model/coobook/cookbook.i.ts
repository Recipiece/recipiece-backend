import { IUserOwnedModel } from '../user-owned-model.i';

export interface ICookbook extends IUserOwnedModel {
  name: string;
  description: string;
  recipes: string[];
}
