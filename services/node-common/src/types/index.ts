import { Request } from 'express';
import { Session, User } from '../model';

export type AuthRequest = Request & { user: User; session: Session };
