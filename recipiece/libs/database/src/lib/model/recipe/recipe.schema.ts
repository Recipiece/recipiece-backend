import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseConstants, Utils } from '@recipiece/common';
import { Document } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { ResponseProvider } from '../base-model';
import { modelUpdateSanitize } from '../hooks';
import { PaginateMethod } from '../paginate';
import { IRecipe, IRecipeAdvancedOptions, IRecipeSection } from './recipe.i';

export type RecipeDocument = Recipe & Document;

@Schema({ collection: DatabaseConstants.collections.recipes })
export class Recipe implements IRecipe, ResponseProvider<IRecipe> {
  id: string;
  @Prop({ type: String }) name: string;
  @Prop({ type: String }) description: string;
  @Prop({ type: Boolean }) private: boolean;
  @Prop({ type: Map }) advanced?: IRecipeAdvancedOptions;
  @Prop({ type: () => [Map] }) sections: IRecipeSection[];
  @Prop({ type: () => [String] }) tags: string[];
  @Prop() owner: string;
  @Prop({ type: Number, default: Utils.utcNow() }) created: number;

  public asResponse(): Partial<IRecipe> {
    return {
      id: this.id,
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

const schema = SchemaFactory.createForClass(Recipe);
schema.pre('update', modelUpdateSanitize);
schema.plugin(paginate);

export const RecipeSchema = schema;
