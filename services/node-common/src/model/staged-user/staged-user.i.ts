import { IBaseModel } from "../base-model.i";

export interface IStagedUser extends IBaseModel {
  email: string;
  password: string;
  salt: string;
  nonce: string;
  token: string;
}
