import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseConstants, Utils } from '@recipiece/common';
import { Document } from 'mongoose';
import { modelUpdateSanitize } from '../hooks';
import { IUserPermissions, UserPermissionsLevel } from './user-permissions.i';

export type UserPermissionsDocument = UserPermissions & Document;

@Schema({ collection: DatabaseConstants.collections.userPermissions })
export class UserPermissions implements IUserPermissions {
  id: string;
  @Prop() owner: string;
  @Prop({ type: Number, default: Utils.utcNow() }) created: number;
  @Prop({type: String}) level: UserPermissionsLevel;
}

const schema = SchemaFactory.createForClass(UserPermissions);
schema.pre('update', modelUpdateSanitize);

export const UserPermissionsSchema = schema;
