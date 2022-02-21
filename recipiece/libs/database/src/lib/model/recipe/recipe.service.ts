import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../model-service';
import { Recipe, RecipeDocument } from './recipe.schema';

@Injectable()
export class RecipeService extends ModelService<RecipeDocument, Recipe> {
  constructor(@InjectModel(Recipe.name) model: Model<RecipeDocument>) {
    super(model);
  }
}
