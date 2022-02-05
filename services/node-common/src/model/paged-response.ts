import mongoose from "mongoose";
import { IBaseModel } from "./base-model";

export interface IPagedResponse<T extends IBaseModel> {
  data: T[];
  more: boolean;
  page: string;
}

export type PaginateMethod<T> = (
  query?: mongoose.FilterQuery<T>,
  options?: mongoose.PaginateOptions,
  callback?: (err: any, result: mongoose.PaginateResult<T>) => void,
) => Promise<mongoose.PaginateResult<T>>;
