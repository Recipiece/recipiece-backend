import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ResponseProvider } from '../base-model';
import { IStagedUser } from './staged-user.i';
import { Utils, DatabaseConstants } from '@recipiece/common';
import { modelUpdateSanitize } from '../hooks';
import { Document } from 'mongoose';

export type StagedUserDocument = StagedUser & Document;

@Schema({ collection: DatabaseConstants.collections.stagedUsers })
export class StagedUser implements IStagedUser, ResponseProvider<IStagedUser> {
  id: string;
  @Prop({ type: String }) email: string;
  @Prop({ type: String }) password: string;
  @Prop({ type: String }) username: string;
  @Prop({ type: String }) salt: string;
  @Prop({ type: String }) nonce: string;
  @Prop({ type: String }) token: string;
  @Prop({ type: Number, default: Utils.utcNow() }) created: number;

  public asResponse: () => Partial<IStagedUser>;

  // public asResponse(): Partial<IStagedUser> {
  //   return {
  //     id: this.id,
  //     created: this.created,
  //     token: this.token,
  //     username: this.username,
  //   };
  // }
}

const schema = SchemaFactory.createForClass(StagedUser);
schema.pre('update', modelUpdateSanitize);

schema.methods.asResponse = function() {
  return {
    id: this.id,
    created: this.created,
    token: this.token,
    username: this.username,
  };
}

export const StagedUserSchema = schema;

