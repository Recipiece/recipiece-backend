import { IBaseModel } from '../base-model';

export interface IStagedUser extends IBaseModel {
  email: string;
  password: string;
  username: string;
  salt: string;
  nonce: string;
  token: string;
}
