import { IBaseUserOwnedModel } from "../base-model";

export interface IForgotPasswordToken extends IBaseUserOwnedModel {
  token: string;
}
