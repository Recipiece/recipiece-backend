import { IBaseUserOwnedModel } from "../base-model";

export type UserPermissionsLevel = 'basic' | 'pro';

export interface IUserPermissions extends IBaseUserOwnedModel {
  level: UserPermissionsLevel;
}
