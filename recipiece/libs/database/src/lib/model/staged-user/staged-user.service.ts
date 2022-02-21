import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../model-service';
import { StagedUser, StagedUserDocument } from './staged-user.schema';

@Injectable()
export class StagedUserService extends ModelService<StagedUserDocument, StagedUser> {
  constructor(@InjectModel(StagedUser.name) model: Model<StagedUserDocument>) {
    super(model);
  }
}
