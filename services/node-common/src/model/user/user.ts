import { DatabaseConstants } from '../../constants/database-constants';
import { utcNow } from '../../utils';
import { DatabaseModel } from '../database-model';
import { IUser } from './user.i';

export class User extends DatabaseModel<IUser> implements IUser {
  email: string;
  password: string;
  salt: string;
  nonce: string;
  preferences: any;
  permissions: string[];
  subscriptionId?: string;

  constructor(model?: Partial<IUser>) {
    super(DatabaseConstants.collections.users, (d) => new User(d), model);
    this.email = model?.email || '';
    this.preferences = model?.preferences || {};
    this.permissions = model?.permissions || [];
    this.subscriptionId = model?.subscriptionId || '';
  }

  public asModel(): Partial<IUser> {
    return {
      _id: this._id,
      created: this.created,
      email: this.email,
      preferences: this.preferences,
      permissions: this.permissions,
      subscriptionId: this.subscriptionId,
    };
  }
}
