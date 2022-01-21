import { DatabaseConstants } from '../../constants/database-constants';
import { DatabaseModel } from '../database-model';
import { IStagedUser } from './staged-user.i';

export class StagedUser extends DatabaseModel<IStagedUser> implements IStagedUser {
  email: string;
  password: string;
  salt: string;
  nonce: string;
  token: string;

  constructor(model?: Partial<IStagedUser>) {
    super(DatabaseConstants.collections.stagedUsers, model);
    this.email = model?.email || '';
    this.password = model?.password || '';
    this.salt = model?.salt || '';
    this.nonce = model?.nonce || '';
    this.token = model?.token || '';
  }

  public asModel(): Partial<IStagedUser> {
    return {
      _id: this._id,
      created: this.created,
      email: this.email,
      token: this.token,
    };
  }
}
