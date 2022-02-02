import { IBaseModel } from '../base-model.i';

export interface IUser extends IBaseModel {
  email: string;
  username: string;
  password: string;
  salt: string;
  nonce: string;
  preferences: any;
  permissions: string[];
  subscriptionId?: string;
}
