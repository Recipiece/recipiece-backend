import { IBaseModel } from '../base-model';

export interface ICommonIngredient extends IBaseModel {
  names: string[];
  v: {
    unit: string;
    amount: number;
  };
  w: {
    unit: string;
    amount: number;
  };
}