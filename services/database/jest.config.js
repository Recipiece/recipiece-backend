/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
process.env['RCP_ENV_NAME'] = 'test';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './test/db-setup.js',
  globals: {
    mongoUri: 'mongodb://127.0.0.1:4444',
  }
};
