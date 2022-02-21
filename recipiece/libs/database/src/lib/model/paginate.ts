import * as mongoose from 'mongoose';

export type PaginateMethod<T> = (
  query?: mongoose.FilterQuery<T>,
  options?: mongoose.PaginateOptions,
  callback?: (err: any, result: mongoose.PaginateResult<T>) => void,
) => Promise<mongoose.PaginateResult<T>>;
