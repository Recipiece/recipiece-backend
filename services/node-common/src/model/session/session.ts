import { DocumentType, getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { DatabaseConstants } from '../../constants';
import { utcNow } from '../../utils';
import { ISession } from './session.i';

@modelOptions({ schemaOptions: { collection: DatabaseConstants.collections.sessions } })
export class Session implements ISession {
  @prop() id: string;
  @prop({ type: String }) owner: string;
  @prop({ type: Number, default: utcNow() }) created: number;

  public static async deserialize(this: ReturnModelType<any>, token: string): Promise<DocumentType<Session>> {
    const buffer = Buffer.from(token, 'base64');
    const decoded = buffer.toString('utf-8');
    const parts = decoded.split('.');
    return SessionModel.findById(new Types.ObjectId(parts[0]));
  }

  public serialize(this: DocumentType<Session>): string {
    const valToEncode = `${this._id.toHexString()}.${this.owner}.${this.created}`;
    return Buffer.from(valToEncode).toString('base64');
  }
}

export const SessionModel = getModelForClass(Session);
