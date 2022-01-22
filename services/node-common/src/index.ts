import dotenv from 'dotenv';

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

export * from './model';
export * from './error';
export * from './interop';
export * from './constants';
export * from './middleware';
export * from './environment';
export * as Utils from './utils';
