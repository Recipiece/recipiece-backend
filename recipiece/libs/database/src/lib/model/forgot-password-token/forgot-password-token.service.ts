import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ForgotPasswordToken, ForgotPasswordTokenDocument } from './forgot-password-token.schema';
import { Model } from 'mongoose';
import { ModelService } from '../model-service';

@Injectable()
export class ForgotPasswordTokenService extends ModelService<ForgotPasswordTokenDocument, ForgotPasswordToken> {
  constructor(@InjectModel(ForgotPasswordToken.name) model: Model<ForgotPasswordTokenDocument>) {
    super(model);
  }
}
