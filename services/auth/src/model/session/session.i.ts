import { IUserOwnedModel } from "@common/model";


export interface ISession extends IUserOwnedModel {
  id: string;
  created: number;
  owner: string;
}
