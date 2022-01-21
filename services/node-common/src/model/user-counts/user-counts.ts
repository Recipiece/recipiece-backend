import { DatabaseConstants } from '../../constants/database-constants';
import { DatabaseModel } from '../database-model';
import { IUserCounts } from './user-counts.i';

export class UserCounts extends DatabaseModel<IUserCounts> implements IUserCounts {
  recipes: number;
  recipeBooks: number;
  shoppingLists: number;
  owner: string;

  constructor(model?: Partial<IUserCounts>) {
    super(DatabaseConstants.collections.userCounts, model);
    this.recipes = model?.recipes ?? 0;
    this.recipeBooks = model?.recipeBooks ?? 0;
    this.shoppingLists = model?.shoppingLists ?? 0;
    this.owner = model?.owner;
  }

  asModel(): Partial<IUserCounts> {
    return {
      recipes: this.recipes,
      recipeBooks: this.recipeBooks,
      shoppingLists: this.shoppingLists,
    };
  }
}
