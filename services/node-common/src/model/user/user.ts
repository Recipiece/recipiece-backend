import { DatabaseConstants } from '../../constants/database-constants';
import { DatabaseModel } from '../database-model';
import { IUser } from './user.i';

export class User extends DatabaseModel<IUser> implements IUser {
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

  public get preferences(): any {
    return this.model.preferences;
  }
  public set preferences(value: any) {
    this.model.preferences = value;
  }

  public get permissions(): string[] {
    return this.model.permissions;
  }
  public set permissions(value: string[]) {
    this.model.permissions = value;
  }

  public get subscriptionId(): string {
    return this.model.subscriptionId;
  }
  public set subscriptionId(value: string) {
    this.model.subscriptionId = value;
  }

  constructor(model: Partial<IUser>) {
    super(DatabaseConstants.collections.users, (d) => new User(d), model);
  }

  public asJson(): Partial<IUser> {
    return {
      _id: this._id,
      created: this.created,
      username: this.username,
      preferences: this.preferences,
      permissions: this.permissions,
      subscriptionId: this.subscriptionId,
    };
  }
}
