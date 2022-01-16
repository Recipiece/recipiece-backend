import { DatabaseConstants, DatabaseModel } from 'recipiece-common';
import { IStagedUser } from './staged-user.i';

export class StagedUser extends DatabaseModel<IStagedUser> implements IStagedUser {
  email: string;
  password: string;
  salt: string;
  nonce: string;
  token: string;
  id: string;
  created: number;

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
      id: this.id,
      created: this.created,
      email: this.email,
      password: this.password,
      salt: this.salt,
      nonce: this.nonce,
      token: this.token,
    }
  }
}
