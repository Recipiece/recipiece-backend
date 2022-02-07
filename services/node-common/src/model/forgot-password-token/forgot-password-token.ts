import { DocumentType, getModelForClass, modelOptions, pre, prop } from '@typegoose/typegoose';
import { DatabaseConstants } from '../../constants';
import { utcNow } from '../../utils';
import { AsJsonProvider } from '../base-model';
import { modelUpdateSanitize } from '../hooks';
import { IForgotPasswordToken } from './forgot-password-token.i';

@modelOptions({ schemaOptions: { collection: DatabaseConstants.collections.forgotPasswordTokens } })
@pre('update', modelUpdateSanitize)
export class ForgotPasswordToken implements IForgotPasswordToken, AsJsonProvider<IForgotPasswordToken> {
  @prop({ type: String }) token: string;
  @prop({ type: String }) owner: string;
  id: string;
  @prop({ type: Number, default: utcNow() }) created: number;

  asJson(this: DocumentType<any>): Partial<IForgotPasswordToken & { id: string }> {
    return {
      id: this._id.toHexString(),
      created: this.created,
      owner: this.owner,
      token: this.token,
    };
  }
}

export const ForgotPasswordTokenModel = getModelForClass(ForgotPasswordToken);
