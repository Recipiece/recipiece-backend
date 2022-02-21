import { NotImplementedException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseConstants, Utils } from '@recipiece/common';
import paginate from 'mongoose-paginate-v2';
import { ResponseProvider } from '../base-model';
import { PaginateMethod } from '../paginate';
import { IMeasure } from './measure.i';
import { Document } from 'mongoose';

export type MeasureDocument = Measure & Document;

@Schema({ collection: DatabaseConstants.collections.measures })
export class Measure implements IMeasure, ResponseProvider<IMeasure> {
  id: string;
  @Prop({ type: [String] }) abbrs: string[];
  @Prop({ type: String }) cat: 'w' | 'v';
  @Prop({ type: Map }) name: { s: string; p: string };
  @Prop({ type: Number }) factor: number;
  @Prop({ type: Boolean }) base: boolean;
  @Prop({ type: Number, default: Utils.utcNow() }) created: number;

  public asResponse(): Partial<IMeasure> {
    return {
      id: this.id,
      abbrs: this.abbrs,
      cat: this.cat,
      name: this.name,
      factor: this.factor,
      base: this.base,
    };
  }

  static paginate: PaginateMethod<Measure>;
}

const schema = SchemaFactory.createForClass(Measure);
schema.pre('save', function () {
  throw new NotImplementedException('Cannot modify measures (yet)!');
});
schema.plugin(paginate);

export const MeasureSchema = schema;
