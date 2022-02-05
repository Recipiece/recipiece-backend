import { DocumentType, getModelForClass, modelOptions, plugin, pre, prop } from '@typegoose/typegoose';
import { PaginateMethod } from '../paged-response';
import { DatabaseConstants } from '../../constants';
import { utcNow } from '../../utils';
import { AsJsonProvider } from '../base-model';
import { modelUpdateSanitize } from '../hooks';
import { ICookbook } from './cookbook.i';
import paginate from 'mongoose-paginate-v2';

@modelOptions({ schemaOptions: { collection: DatabaseConstants.collections.recipeBooks } })
@pre('update', modelUpdateSanitize)
@plugin(paginate)
export class Cookbook implements ICookbook, AsJsonProvider<ICookbook> {
  @prop() id: string;
  @prop({ type: String }) name: string;
  @prop({ type: String }) description: string;
  @prop({ type: () => [String] }) recipes: string[];
  @prop({ type: String }) owner: string;
  @prop({ type: Number, default: utcNow() }) created: number;

  public asJson(this: DocumentType<any>): Partial<ICookbook> {
    return {
      id: this._id.toHexString(),
      owner: this.owner,
      name: this.name,
      description: this.description,
      recipes: this.recipes,
    };
  }

  static paginate: PaginateMethod<Cookbook>;
}

export const CookbookModel = getModelForClass(Cookbook);
