import { IBaseModel } from "./base-model.i";

export interface IUserOwnedModel extends IBaseModel {
  id: string;
  created: number;
  owner: string;
}
