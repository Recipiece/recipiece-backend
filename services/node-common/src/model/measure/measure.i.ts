import { IBaseModel } from '../base-model.i';

export interface IMeasure extends IBaseModel {
  abbrs: string[];
  cat: 'w' | 'v';
  name: {
    s: string;
    p: string;
  };
  factor: number;
  base: boolean;
  preferFractions?: boolean,
}
