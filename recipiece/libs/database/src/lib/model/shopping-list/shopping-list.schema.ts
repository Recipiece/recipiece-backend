import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseConstants, Utils } from '@recipiece/common';
import { Document } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { ResponseProvider } from '../base-model';
import { modelUpdateSanitize } from '../hooks';
import { PaginateMethod } from '../paginate';
import { IAllowedUser, IShoppingList, IShoppingListItem } from './shopping-list.i';

export type ShoppingListDocument = ShoppingList & Document;

@Schema({ collection: DatabaseConstants.collections.shoppingLists })
export class ShoppingList implements IShoppingList, ResponseProvider<IShoppingList> {
  id: string;
  @Prop({ type: String }) name: string;
  @Prop() items: IShoppingListItem[];
  @Prop() allowed: IAllowedUser[];
  @Prop() owner: string;
  @Prop({ type: Number, default: Utils.utcNow() }) created: number;

  public asResponse(): Partial<IShoppingList> {
    return {
      id: this.id,
      owner: this.owner,
      name: this.name,
      created: this.created,
      items: this.items,
      allowed: this.allowed,
    };
  }

  static paginate: PaginateMethod<ShoppingList>;
}

const schema = SchemaFactory.createForClass(ShoppingList);
schema.pre('update', modelUpdateSanitize);
schema.plugin(paginate);

export const ShoppingListSchema = schema;
