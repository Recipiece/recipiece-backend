import { Session, User } from '@recipiece/database';
import { Request } from 'express';

export type AuthRequest = Request & {
  user: User;
  session: Session;
};
