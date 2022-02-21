import { NotImplementedException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseConstants, Utils } from '@recipiece/common';
import { Document } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { ResponseProvider } from '../base-model';
import { ICommonIngredient } from './common-ingredient.i';

export type CommonIngredientDocument = CommonIngredient & Document;

@Schema({ collection: DatabaseConstants.collections.commonIngredients })
export class CommonIngredient implements ICommonIngredient, ResponseProvider<ICommonIngredient> {
  id: string;
  @Prop({ type: [String] }) names: string[];
  @Prop({ type: Map }) v: { unit: string; amount: number };
  @Prop({ type: Map }) w: { unit: string; amount: number };
  @Prop({ type: Number, default: Utils.utcNow() }) created: number;

  public asResponse(): Partial<ICommonIngredient> {
    return {
      id: this.id,
      v: this.v,
      w: this.w,
      created: this.created,
    };
  }
}

const schema = SchemaFactory.createForClass(CommonIngredient);
schema.pre('save', function () {
  throw new NotImplementedException('Cannot modify common ingredient names (yet)!');
});
schema.plugin(paginate);

export const CommonIngredientSchema = schema;
