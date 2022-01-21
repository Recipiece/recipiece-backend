import { IBaseModel } from "./base-model.i";

export interface IPagedResult<T extends IBaseModel> {
  data: T[];
  more: boolean;
  page?: string
}
