import { utcNow } from '../utils';
import { Schema } from 'mongoose';
import { DatabaseConstants } from '../constants';

export const BaseSchema = {
  created: {
    type: Number,
    default: utcNow(),
  },
};

export const BaseUserOwnedSchema = {
  ...BaseSchema,
  owner: {
    type: Schema.Types.ObjectId,
    ref: DatabaseConstants.collections.users,
  },
};
