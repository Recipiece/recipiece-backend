import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../model-service';
import { CommonIngredientName, CommonIngredientNameDocument } from './common-ingredient-name.schema';

@Injectable()
export class CommonIngredientNameService extends ModelService<CommonIngredientNameDocument, CommonIngredientName> {
  constructor(@InjectModel(CommonIngredientName.name) model: Model<CommonIngredientNameDocument>) {
    super(model);
  }
}
