import { IBaseModel } from "recipiece-common";

export interface IUser extends IBaseModel {
  id: string;
  created: number;
  email: string;
  password: string;
  salt: string;
  nonce: string;
  preferences: any;
  permissions: string[];
  subscriptionId?: string;
}
