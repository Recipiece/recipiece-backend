import { DatabaseConstants } from '@common/constants';
import { DatabaseModel } from '@common/model';
import { utcNow } from '@common/utils';
import { IUser } from './user.i';

export class User extends DatabaseModel<IUser> implements IUser {
  email: string;
  password: string;
  salt: string;
  nonce: string;
  preferences: any;
  permissions: string[];
  subscriptionId?: string;
  id: string;
  created: number;

  constructor(model?: Partial<IUser>) {
    super(DatabaseConstants.collections.users);
    this.email = model?.email || '';
    this.preferences = model?.preferences || {};
    this.permissions = model?.permissions || [];
    this.subscriptionId = model?.subscriptionId || '';
    this.id = model?.id;
    this.created = model.created || utcNow();
  }

  public asModel(): Partial<IUser> {
    return {
      id: this.id,
      created: this.created,
      email: this.email,
      preferences: this.preferences,
      permissions: this.permissions,
      subscriptionId: this.subscriptionId,
    };
  }
}
