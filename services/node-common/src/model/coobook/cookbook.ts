import { DatabaseConstants } from '../../constants';
import { DatabaseModel } from '../database-model';
import { ICookbook } from './cookbook.i';

export class Cookbook extends DatabaseModel<ICookbook> implements ICookbook {
  name: string;
  description: string;
  recipes: string[];
  owner: string;

  constructor(model?: Partial<ICookbook>) {
    super(DatabaseConstants.collections.recipeBooks, (data) => new Cookbook(data as ICookbook), model);
    this.owner = model?.owner || '';
    this.name = model?.name || '';
    this.description = model?.description || '';
    this.recipes = model?.recipes || [];
  }

  public asModel(): Partial<ICookbook> {
    return {
      _id: this._id,
      owner: this.owner,
      description: this.description,
      name: this.name,
      recipes: this.recipes,
    };
  }
}
