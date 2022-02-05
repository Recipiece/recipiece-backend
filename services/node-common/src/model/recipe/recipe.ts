import { DocumentType, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { DatabaseConstants } from '../../constants';
import { utcNow } from '../../utils';
import { AsJsonProvider } from '../base-model';
import { IRecipe, IRecipeAdvancedOptions, IRecipeSection } from './recipe.i';

@modelOptions({ schemaOptions: { collection: DatabaseConstants.collections.recipes } })
export class Recipe implements IRecipe, AsJsonProvider<IRecipe> {
  @prop() id: string;
  @prop({ type: String }) name: string;
  @prop({ type: String }) description: string;
  @prop({ type: Boolean }) private: boolean;
  @prop({ type: Map }) advanced?: IRecipeAdvancedOptions;
  @prop({ type: [Map] }) sections: IRecipeSection[];
  @prop({ type: [String] }) tags: string[];
  @prop({ type: String }) owner: string;
  @prop({ type: Number, default: utcNow() }) created: number;

  public asJson(this: DocumentType<Recipe>): Partial<IRecipe> {
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
}

export const RecipeModel = getModelForClass(Recipe);
