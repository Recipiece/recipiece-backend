import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../model-service';
import { CommonIngredient, CommonIngredientDocument } from './common-ingredient.schema';

@Injectable()
export class CommonIngredientService extends ModelService<CommonIngredientDocument, CommonIngredient> {
  constructor(@InjectModel(CommonIngredient.name) model: Model<CommonIngredientDocument>) {
    super(model);
  }
}
