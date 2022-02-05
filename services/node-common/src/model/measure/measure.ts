import { DocumentType, getModelForClass, modelOptions, plugin, pre, prop } from '@typegoose/typegoose';
import { DatabaseConstants } from '../../constants';
import { utcNow } from '../../utils';
import { AsJsonProvider } from '../base-model';
import { IMeasure } from './measure.i';
import paginate from 'mongoose-paginate-v2';

@pre('save', function () {
  throw new Error('Cannot create new measures');
})
@modelOptions({schemaOptions: {collection: DatabaseConstants.collections.measures}})
@plugin(paginate)
export class Measure implements IMeasure, AsJsonProvider<IMeasure> {
  @prop() id: string;
  @prop({ type: [String] }) abbrs: string[];
  @prop({ type: String }) cat: 'w' | 'v';
  @prop({ type: Map }) name: { s: string; p: string };
  @prop({ type: Number }) factor: number;
  @prop({ type: Boolean }) base: boolean;
  @prop({ type: Number, default: utcNow() }) created: number;

  public asJson(this: DocumentType<Measure>): Partial<IMeasure> {
    return {
      id: this._id.toHexString(),
      abbrs: this.abbrs,
      cat: this.cat,
      name: this.name,
      factor: this.factor,
      base: this.base,
    };
  }
}

export const MeasureModel = getModelForClass(Measure);
