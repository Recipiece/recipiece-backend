import { DocumentType, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { DatabaseConstants } from '../../constants';
import { utcNow } from '../../utils';
import { AsJsonProvider } from '../base-model';
import { ICookbook } from './cookbook.i';

@modelOptions({ schemaOptions: { collection: DatabaseConstants.collections.recipeBooks } })
export class Cookbook implements ICookbook, AsJsonProvider<ICookbook> {
  @prop() id: string;
  @prop({ type: String }) name: string;
  @prop({ type: String }) description: string;
  @prop({ type: () => [String] }) recipes: string[];
  @prop({ type: String }) owner: string;
  @prop({ type: Number, default: utcNow() }) created: number;

  public asJson(this: DocumentType<Cookbook>): Partial<ICookbook> {
    return {
      id: this._id.toHexString(),
      owner: this.owner,
      name: this.name,
      description: this.description,
      recipes: this.recipes,
    };
  }
}

export const CookbookModel = getModelForClass(Cookbook);
