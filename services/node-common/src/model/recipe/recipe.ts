import { DocumentType, getModelForClass, modelOptions, plugin, pre, prop } from '@typegoose/typegoose';
import paginate from 'mongoose-paginate-v2';
import { DatabaseConstants } from '../../constants';
import { utcNow } from '../../utils';
import { AsJsonProvider } from '../base-model';
import { modelUpdateSanitize } from '../hooks';
import { PaginateMethod } from '../paged-response';
import { IRecipe, IRecipeAdvancedOptions, IRecipeSection } from './recipe.i';

@modelOptions({ schemaOptions: { collection: DatabaseConstants.collections.recipes } })
@pre('update', modelUpdateSanitize)
@plugin(paginate)
export class Recipe implements IRecipe, AsJsonProvider<IRecipe> {
  id: string;
  @prop({ type: String }) name: string;
  @prop({ type: String }) description: string;
  @prop({ type: Boolean }) private: boolean;
  @prop({ type: Map }) advanced?: IRecipeAdvancedOptions;
  @prop({ type: () => [Map] }) sections: IRecipeSection[];
  @prop({ type: () => [String] }) tags: string[];
  @prop({ type: String }) owner: string;
  @prop({ type: Number, default: utcNow() }) created: number;

  public asJson(this: DocumentType<any>): Partial<IRecipe> {
    return {
      id: this._id.toHexString(),
      owner: this.owner,
      name: this.name,
      description: this.description,
      private: this.private,
      advanced: this.advanced,
      sections: this.sections,
      tags: this.tags,
    };
  }

  static paginate: PaginateMethod<Recipe>;
}

export const RecipeModel = getModelForClass(Recipe);
