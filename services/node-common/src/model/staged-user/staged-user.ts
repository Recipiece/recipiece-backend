import { DatabaseConstants } from '../../constants/database-constants';
import { DatabaseModel } from '../database-model';
import { IStagedUser } from './staged-user.i';

export class StagedUser extends DatabaseModel<IStagedUser> implements IStagedUser {
  public get email(): string {
    return this.model.email;
  }
  public set email(value: string) {
    this.model.email = value;
  }

  public get username(): string {
    return this.model.username;
  }
  public set username(value: string) {
    this.model.username = value;
  }

  public get password(): string {
    return this.model.password;
  }
  public set password(value: string) {
    this.model.password = value;
  }

  public get salt(): string {
    return this.model.salt;
  }
  public set salt(value: string) {
    this.model.salt = value;
  }

  public get nonce(): string {
    return this.model.nonce;
  }
  public set nonce(value: string) {
    this.model.nonce = value;
  }

  public get token(): string {
    return this.model.token;
  }
  public set token(value: string) {
    this.model.token = value;
  }

  constructor(model: Partial<IStagedUser>) {
    super(DatabaseConstants.collections.stagedUsers, (d) => new StagedUser(d), model);
  }

  public asJson(): Partial<IStagedUser> {
    return {
      _id: this._id,
      created: this.created,
      token: this.token,
      username: this.username,
    };
  }
}
