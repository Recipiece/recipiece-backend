import { IUserOwnedModel } from 'recipiece-common';

export interface ISession extends IUserOwnedModel {
  id: string;
  created: number;
  owner: string;
}
