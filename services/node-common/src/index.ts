import dotenv from 'dotenv';
import { IUser } from './model/user/user.i';

let file;

const envName = process.env['RCP_ENV_NAME'] || 'docker';

if (envName === 'test') {
  file = '.env.test';
} else if (envName === 'docker') {
  file = '.env.docker';
} else if (envName === 'local') {
  file = '.env.local';
} else if (envName === 'prod') {
  file = '.env.prod';
}

dotenv.config({
  path: `${__dirname}/environment/${file}`,
  override: true,
  debug: envName === 'docker' || envName === 'local',
});

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
    token?: string;
  }
}

export * from './model';
export * from './error';
export * from './interop';
export * from './constants';
export * from './middleware';
export * from './environment';
export * from './types';
export * as Utils from './utils';
