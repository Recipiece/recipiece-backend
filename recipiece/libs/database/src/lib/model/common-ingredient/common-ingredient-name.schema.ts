import { NotImplementedException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseConstants, Utils } from '@recipiece/common';
import paginate from 'mongoose-paginate-v2';
import { ResponseProvider } from '../base-model';
import { ICommonIngredientName } from './common-ingredient-name.i';
import { Document } from 'mongoose';

export type CommonIngredientNameDocument = CommonIngredientName & Document;

@Schema({ collection: DatabaseConstants.collections.commonIngredientNames })
export class CommonIngredientName implements ICommonIngredientName, ResponseProvider<ICommonIngredientName> {
  id: string;
  @Prop({ type: String }) name: string;
  @Prop({ type: Number, default: Utils.utcNow() }) created: number;

  public asResponse(): Partial<ICommonIngredientName> {
    return {
      id: this.id,
      name: this.name,
      created: this.created,
    };
  }
}

const schema = SchemaFactory.createForClass(CommonIngredientName);
schema.pre('save', function () {
  throw new NotImplementedException('Cannot modify common ingredient names (yet)!');
});
schema.plugin(paginate);

export const CommonIngredientNameSchema = schema;
