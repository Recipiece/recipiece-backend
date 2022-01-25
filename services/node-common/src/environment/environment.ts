import { EnvironmentConstants } from '../constants/environment-contstants';

export class Environment {
  static get IS_TEST(): boolean {
    return (process.env[EnvironmentConstants.variables.envName] || EnvironmentConstants.defaults.envName) === 'test';
  }

  static get IS_DOCKER(): boolean {
    return (process.env[EnvironmentConstants.variables.envName] || EnvironmentConstants.defaults.envName) === 'docker';
  }

  static get IS_LOCAL(): boolean {
    return (process.env[EnvironmentConstants.variables.envName] || EnvironmentConstants.defaults.envName) === 'local';
  }

  static get IS_PRODUCTION(): boolean {
    return (process.env[EnvironmentConstants.variables.envName] || EnvironmentConstants.defaults.envName) === 'prod';
  }

  // db basics
  static get DB_HOST(): string {
    return process.env[EnvironmentConstants.variables.dbHost];
  }
  static get DB_PORT(): number {
    return Number.parseInt(process.env[EnvironmentConstants.variables.dbPort]);
  }
  static get DB_PASSWORD(): string {
    return process.env[EnvironmentConstants.variables.dbPassword];
  }
  static get DB_USER(): string {
    return process.env[EnvironmentConstants.variables.dbUser];
  }
  static get DB_NAME(): string {
    return process.env[EnvironmentConstants.variables.dbName];
  }
  static get DB_PAGE_SIZE(): number {
    return Number.parseInt(process.env[EnvironmentConstants.variables.dbPageSize]);
  }

  // memcache values
  static get MEMCACHE_HOST(): string {
    return process.env[EnvironmentConstants.variables.memcacheHost];
  }
  static get MEMCACHE_PORT(): number {
    return Number.parseInt(process.env[EnvironmentConstants.variables.memcachePort]);
  }
  // memcache exipry, in seconds
  static get MEMCACHE_EXP(): number {
    return Number.parseInt(process.env[EnvironmentConstants.variables.memcacheExpiry]);
  }

  // email settings
  static get SUPPORT_EMAIL(): string {
    return process.env[EnvironmentConstants.variables.supportEmailAddress];
  }

  static get MAILJET_API_KEY(): string {
    return process.env[EnvironmentConstants.variables.mailjetApiKey];
  }

  static get MAILJET_SECRET_KEY(): string {
    return process.env[EnvironmentConstants.variables.mailjetSecret];
  }

  // paypal values
  static get PAYPAL_HOST(): string {
    return process.env[EnvironmentConstants.variables.paypalHost];
  }

  // service ports
  static get AUTH_SERIVCE_PORT(): number {
    return Number.parseInt(process.env[EnvironmentConstants.variables.authServicePort]);
  }
  static get AUTH_SERVICE_NAME(): string {
    return process.env[EnvironmentConstants.variables.authServiceName];
  }
  static get RECIPE_SERIVCE_PORT(): number {
    return Number.parseInt(process.env[EnvironmentConstants.variables.recipeServicePort]);
  }
  static get RECIPE_SERVICE_NAME(): string {
    return process.env[EnvironmentConstants.variables.recipeServiceName];
  }
  static get DB_SERIVCE_PORT(): number {
    return Number.parseInt(process.env[EnvironmentConstants.variables.dbServicePort]);
  }
  static get DB_SERVICE_NAME(): string {
    return process.env[EnvironmentConstants.variables.dbServiceName];
  }
  static get DB_SERVICE_URI(): string {
    return `http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}`;
  }

  static get MEMCACHE_SERIVCE_PORT(): number {
    return Number.parseInt(process.env[EnvironmentConstants.variables.memcacheServicePort]);
  }
  static get MEMCACHE_SERVICE_NAME(): string {
    return process.env[EnvironmentConstants.variables.memcacheServiceName];
  }
  static get MEMCACHE_SERVICE_URI(): string {
    return `http://${Environment.MEMCACHE_SERVICE_NAME}:${Environment.MEMCACHE_SERIVCE_PORT}`;
  }

  static get EMAIL_SERVICE_NAME(): string {
    return process.env[EnvironmentConstants.variables.emailServiceName];
  }

  static get EMAIL_SERVICE_PORT(): number {
    return Number.parseInt(process.env[EnvironmentConstants.variables.emailServicePort]);
  }

  static get EMAIL_SERVICE_URI(): string {
    return `http://${Environment.EMAIL_SERVICE_NAME}:${Environment.EMAIL_SERVICE_PORT}`;
  }

  // internal user for handling service -> service requests
  static get INTERNAL_USER_TOKEN(): string {
    return process.env[EnvironmentConstants.variables.internalUserToken];
  }
}
