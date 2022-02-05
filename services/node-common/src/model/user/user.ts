import { DocumentType, getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { DatabaseConstants } from '../../constants';
import { utcNow } from '../../utils';
import { AsJsonProvider } from '../base-model';
import { IUser } from './user.i';

@modelOptions({
  schemaOptions: { collection: DatabaseConstants.collections.users },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User implements IUser, AsJsonProvider<IUser> {
  @prop() id: string;
  @prop({ type: String, default: '', unique: true }) email?: string;
  @prop({ type: String, default: '', unique: true }) username?: string;
  @prop({ type: String, default: '' }) password?: string;
  @prop({ type: String, default: '' }) salt?: string;
  @prop({ type: String, default: '' }) nonce?: string;
  @prop({ type: Map, default: {} }) preferences?: any;
  @prop({ type: Array, default: [] }) permissions?: string[];
  @prop({ type: String, default: '' }) subscriptionId?: string;
  @prop({ type: Number, default: utcNow() }) created: number;

  public asJson(this: DocumentType<User>): Partial<IUser> {
    return {
      id: this._id.toHexString(),
      created: this.created,
      username: this.username,
      preferences: this.preferences,
      permissions: this.permissions,
      subscriptionId: this.subscriptionId,
    };
  }
}

export const UserModel = getModelForClass(User);
