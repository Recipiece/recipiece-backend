import { Types } from 'mongoose';
import { IBaseUserOwnedModel } from '../base-model';

export interface ICookbook extends IBaseUserOwnedModel {
  name: string;
  description: string;
  recipes: string[];
}
