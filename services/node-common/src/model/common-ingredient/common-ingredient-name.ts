import { DocumentType, getModelForClass, modelOptions, pre, prop } from '@typegoose/typegoose';
import { DatabaseConstants } from '../../constants';
import { utcNow } from '../../utils';
import { AsJsonProvider } from '../base-model';
import { ICommonIngredientName } from './common-ingredient-name.i';

@pre('save', function () {
  throw new Error('Cannot create new common ingredient names');
})
@modelOptions({ schemaOptions: { collection: DatabaseConstants.collections.commonIngredientNames } })
export class CommonIngredientName implements ICommonIngredientName, AsJsonProvider<ICommonIngredientName> {
  id: string;
  @prop({ type: String }) name: string;
  @prop({ type: Number, default: utcNow() }) created: number;

  asJson(this: DocumentType<CommonIngredientName>): Partial<ICommonIngredientName> {
    return {
      id: this._id.toHexString(),
      name: this.name,
      created: this.created,
    };
  }
}

export const CommonIngredientNameModel = getModelForClass(CommonIngredientName);
