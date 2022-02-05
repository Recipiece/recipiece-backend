import { DocumentType, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { DatabaseConstants } from '../../constants';
import { utcNow } from '../../utils';
import { AsJsonProvider } from '../base-model';
import { IStagedUser } from './staged-user.i';

@modelOptions({ schemaOptions: { collection: DatabaseConstants.collections.stagedUsers } })
export class StagedUser implements IStagedUser, AsJsonProvider<IStagedUser> {
  @prop() id: string;
  @prop({ type: String }) email: string;
  @prop({ type: String }) password: string;
  @prop({ type: String }) username: string;
  @prop({ type: String }) salt: string;
  @prop({ type: String }) nonce: string;
  @prop({ type: String }) token: string;
  @prop({ type: Number, default: utcNow() }) created: number;

  public asJson(this: DocumentType<StagedUser>): Partial<IStagedUser> {
    return {
      id: this._id.toHexString(),
      created: this.created,
      token: this.token,
      username: this.username,
    };
  }
}

export const StagedUserModel = getModelForClass(StagedUser);
