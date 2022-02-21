import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseConstants, Utils } from '@recipiece/common';
import { Document } from 'mongoose';
import { modelUpdateSanitize } from '../hooks';
import { ISession } from './session.i';

export type SessionDocument = Session & Document;

@Schema({ collection: DatabaseConstants.collections.sessions })
export class Session implements ISession {
  id: string;
  @Prop() owner: string;
  @Prop({ type: Number, default: Utils.utcNow() }) created: number;
  static deserialize: (token: string) => Promise<Session>;
  serialize: () => string;
}

const schema = SchemaFactory.createForClass(Session);
schema.pre('update', modelUpdateSanitize);

schema.methods.serialize = function(): string {
  const valToEncode = `${this.id}.${this.owner.toHexString()}.${this.created}`;
  return Buffer.from(valToEncode).toString('base64');
}

schema.statics.deserialize = async function(token: string): Promise<Session> {
  const buffer = Buffer.from(token, 'base64');
  const decoded = buffer.toString('utf-8');
  const parts = decoded.split('.');
  return await this.findById(parts[0]);
}

export const SessionSchema = schema;
