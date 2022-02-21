import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Utils, DatabaseConstants } from '@recipiece/common';
import { modelUpdateSanitize } from '../hooks';
import { IUser } from './user.i';
import { ResponseProvider } from '../base-model';

export type UserDocument = User & Document;

@Schema({ collection: DatabaseConstants.collections.users })
export class User implements IUser, ResponseProvider<IUser> {
  id: string;
  @Prop({ unique: true, default: '' }) email?: string;
  @Prop({ unique: true, default: '' }) username?: string;
  @Prop({ default: '' }) password?: string;
  @Prop({ default: '' }) salt?: string;
  @Prop({ default: '' }) nonce?: string;
  @Prop({ type: Map, default: {} }) preferences?: any;
  @Prop({default: Utils.utcNow()}) created: number;

  public asResponse(): Partial<IUser> {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      created: this.created,
    }
  }
}

const schema = SchemaFactory.createForClass(User);
schema.pre('update', modelUpdateSanitize);

export const UserSchema = schema;
