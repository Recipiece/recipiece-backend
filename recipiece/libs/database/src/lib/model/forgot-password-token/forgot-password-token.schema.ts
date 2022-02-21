import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseConstants, Utils } from '@recipiece/common';
import { Document } from 'mongoose';
import { ResponseProvider } from '../base-model';
import { modelUpdateSanitize } from '../hooks';
import { IForgotPasswordToken } from './forgot-password-token.i';

export type ForgotPasswordTokenDocument = ForgotPasswordToken & Document;

@Schema({ collection: DatabaseConstants.collections.forgotPasswordTokens })
export class ForgotPasswordToken implements IForgotPasswordToken, ResponseProvider<IForgotPasswordToken> {
  id: string;
  @Prop({ type: String }) token: string;
  @Prop({ type: String }) owner: string;
  @Prop({ type: Number, default: Utils.utcNow() }) created: number;

  public asResponse(): Partial<IForgotPasswordToken> {
    return {
      id: this.id,
      created: this.created,
      owner: this.owner,
      token: this.token,
    };
  }
}

const schema = SchemaFactory.createForClass(ForgotPasswordToken);
schema.pre('update', modelUpdateSanitize);

export const ForgotPasswordTokenSchema = schema;
