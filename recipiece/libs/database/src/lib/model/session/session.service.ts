import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../model-service';
import { Session, SessionDocument } from './session.schema';

@Injectable()
export class SessionService extends ModelService<SessionDocument, Session> {
  constructor(@InjectModel(Session.name) model: Model<SessionDocument>) {
    super(model);
  }
}
