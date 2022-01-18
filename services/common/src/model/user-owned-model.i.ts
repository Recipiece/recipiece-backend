import { IBaseModel } from './base-model.i';

export interface IUserOwnedModel extends IBaseModel {
  owner: string;
}
