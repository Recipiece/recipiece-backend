import { Database } from '@common/database';
import { DatabaseModel } from '@common/model';
import { utcNow } from '@common/utils';
import { container } from 'tsyringe';
import { IRecipe, IRecipeAdvancedOptions, IRecipeSection } from './recipe.i';

export class Recipe extends DatabaseModel<IRecipe> implements IRecipe {
  name: string;
  description: string;
  private: boolean;
  advanced?: IRecipeAdvancedOptions;
  sections: IRecipeSection[];
  tags: string[];
  owner: string;
  id: string;
  readonly created: number;

  constructor(model?: Partial<IRecipe>) {
    super(container.resolve(Database), 'Recipes');
    this.name = model?.name || '';
    this.description = model?.description || '';
    this.private = model?.private || false;
    this.advanced = model?.advanced;
    this.sections = model?.sections || [];
    this.tags = model?.tags || [];
    this.owner = model?.owner || '';
    this.id = model?.id;
    this.created = model?.created || utcNow();
  }

  public asModel(): Partial<IRecipe> {
    return {
      id: this.id,
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
