/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
process.env['RCP_ENV_NAME'] = 'test';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};