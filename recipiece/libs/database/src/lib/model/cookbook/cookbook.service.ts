import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../model-service';
import { Cookbook, CookbookDocument } from './cookbook.schema';

@Injectable()
export class CookbookService extends ModelService<CookbookDocument, Cookbook> {
  constructor(@InjectModel(Cookbook.name) model: Model<CookbookDocument>) {
    super(model);
  }
}
