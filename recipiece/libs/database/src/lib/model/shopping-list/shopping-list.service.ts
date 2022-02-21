import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../model-service';
import { ShoppingList, ShoppingListDocument } from './shopping-list.schema';

@Injectable()
export class ShoppingListService extends ModelService<ShoppingListDocument, ShoppingList> {
  constructor(@InjectModel(ShoppingList.name) model: Model<ShoppingListDocument>) {
    super(model);
  }
}
