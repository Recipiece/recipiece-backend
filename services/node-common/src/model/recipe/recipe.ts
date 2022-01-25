import { DatabaseConstants } from '../../constants/database-constants';
import { DatabaseModel } from '../database-model';
import { IRecipe, IRecipeAdvancedOptions, IRecipeSection } from './recipe.i';

export class Recipe extends DatabaseModel<IRecipe> implements IRecipe {
  name: string;
  description: string;
  private: boolean;
  advanced?: IRecipeAdvancedOptions;
  sections: IRecipeSection[];
  tags: string[];
  owner: string;

  constructor(model?: Partial<IRecipe>) {
    super(DatabaseConstants.collections.recipes, (d) => new Recipe(d), model);
    this.name = model?.name || '';
    this.description = model?.description || '';
    this.private = model?.private || false;
    this.advanced = model?.advanced;
    this.sections = model?.sections || [];
    this.tags = model?.tags || [];
    this.owner = model?.owner || '';
  }

  public asModel(): Partial<IRecipe> {
    return {
      _id: this._id,
      created: this.created,
      name: this.name,
      description: this.description,
      private: this.private,
      owner: this.owner,
      advanced: this.advanced,
      sections: this.sections,
      tags: this.tags,
    };
  }
}
