import { IBaseUserOwnedModel } from '../base-model';

export interface IShoppingListItem {
  id: string;
  name: string;
  notes: string;
  category?: string;
  ordinal: number;
  completed: boolean;
  recipe?: string;
}

export interface IAllowedUser {
  userId: string;
  username: string;
}

export interface IShoppingList extends IBaseUserOwnedModel {
  name: string;
  items: IShoppingListItem[];
  allowed: IAllowedUser[];
}
