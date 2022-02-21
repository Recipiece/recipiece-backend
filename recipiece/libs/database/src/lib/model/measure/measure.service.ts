import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../model-service';
import { Measure, MeasureDocument } from './measure.schema';

@Injectable()
export class MeasureService extends ModelService<MeasureDocument, Measure> {
  constructor(@InjectModel(Measure.name) model: Model<MeasureDocument>) {
    super(model);
  }
}
