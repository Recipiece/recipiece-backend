import { Request } from 'express';
import { IUser } from '../model';

export type AuthRequest = Request & {user: IUser, token: string};
