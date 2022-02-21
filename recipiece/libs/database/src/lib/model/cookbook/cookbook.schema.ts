import { Document } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { ResponseProvider } from '../base-model';
import { modelUpdateSanitize } from '../hooks';
import { PaginateMethod } from '../paginate';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseConstants, Utils } from '@recipiece/common';
import { ICookbook } from './cookbook.i';

export type CookbookDocument = Cookbook & Document;

@Schema({collection: DatabaseConstants.collections.cookbooks})
export class Cookbook implements ICookbook, ResponseProvider<ICookbook> {
  id: string;
  @Prop({ type: String }) name: string;
  @Prop({ type: String }) description: string;
  @Prop({ type: () => [String] }) recipes: string[];
  @Prop({ type: String }) owner: string;
  @Prop({ type: Number, default: Utils.utcNow() }) created: number;

  public asResponse(): Partial<ICookbook> {
    return {
      id: this.id,
      owner: this.owner,
      name: this.name,
      description: this.description,
      recipes: this.recipes,
    };
  }

  static paginate: PaginateMethod<Cookbook>;
}

const schema = SchemaFactory.createForClass(Cookbook);
schema.pre('update', modelUpdateSanitize);
schema.plugin(paginate);

export const CookbookSchema = schema;
