import { DocumentType, getModelForClass, modelOptions, pre, prop } from '@typegoose/typegoose';
import { DatabaseConstants } from '../../constants';
import { utcNow } from '../../utils';
import { AsJsonProvider } from '../base-model';
import { ICommonIngredient } from './common-ingredient.i';

@pre('save', function () {
  throw new Error('Cannot create new common ingredients');
})
@modelOptions({ schemaOptions: { collection: DatabaseConstants.collections.commonIngredients } })
export class CommonIngredient implements ICommonIngredient, AsJsonProvider<ICommonIngredient> {
  @prop() id: string;
  @prop({ type: [String] }) names: string[];
  @prop({ type: Map }) v: { unit: string; amount: number };
  @prop({ type: Map }) w: { unit: string; amount: number };
  @prop({ type: Number, default: utcNow() }) created: number;

  public asJson(this: DocumentType<CommonIngredient>): Partial<ICommonIngredient> {
    return {
      id: this._id.toHexString(),
      v: this.v,
      w: this.w,
      created: this.created,
    };
  }
}

export const CommonIngredientModel = getModelForClass(CommonIngredient);
