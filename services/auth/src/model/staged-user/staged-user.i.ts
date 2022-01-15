import { IBaseModel } from "@common/model";

export interface IStagedUser extends IBaseModel {
  id: string;
  created: number;
  email: string;
  password: string;
  salt: string;
  nonce: string;
  token: string;
}
