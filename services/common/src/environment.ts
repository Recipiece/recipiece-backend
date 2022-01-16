import { EnvironmentConstants } from './constants/environment-contstants';

export class Environment {
  // db basics
  static get DB_HOST(): string {
    return process.env[EnvironmentConstants.variables.dbHost] || EnvironmentConstants.defaults.dbHost;
  }
  static get DB_PORT(): number {
    return Number.parseInt(process.env[EnvironmentConstants.variables.dbPort] || EnvironmentConstants.defaults.dbPort);
  }
  static get DB_PASSWORD(): string {
    return process.env[EnvironmentConstants.variables.dbPassword] || EnvironmentConstants.defaults.dbPassword;
  }
  static get DB_USER(): string {
    return process.env[EnvironmentConstants.variables.dbUser] || EnvironmentConstants.defaults.dbUser;
  }
  static get DB_NAME(): string {
    return process.env[EnvironmentConstants.variables.dbName] || EnvironmentConstants.defaults.dbName;
  }
  static get DB_PAGE_SIZE(): number {
    return Number.parseInt(
      process.env[EnvironmentConstants.variables.dbPageSize] || EnvironmentConstants.defaults.dbPageSize
    );
  }

  // memcache values
  static get MEMCACHE_HOST(): string {
    return process.env[EnvironmentConstants.variables.memcacheHost] || EnvironmentConstants.defaults.memcacheHost;
  }
  static get MEMCACHE_PORT(): number {
    return Number.parseInt(
      process.env[EnvironmentConstants.variables.memcachePort] || EnvironmentConstants.defaults.memcachePort
    );
  }
  // memcache exipry, in seconds
  static get MEMCACHE_EXP(): number {
    return Number.parseInt(
      process.env[EnvironmentConstants.variables.memcacheExpiry] || EnvironmentConstants.defaults.memcacheExpiry
    );
  }

  // email address to use for sending emails
  static get SUPPORT_EMAIL(): string {
    return (
      process.env[EnvironmentConstants.variables.supportEmailAddress] ||
      EnvironmentConstants.defaults.supportEmailAddress
    );
  }

  // paypal values
  static get PAYPAL_HOST(): string {
    return process.env[EnvironmentConstants.variables.paypalHost] || EnvironmentConstants.defaults.paypalHost;
  }

  // service ports
  static get AUTH_SERIVCE_PORT(): number {
    return Number.parseInt(
      process.env[EnvironmentConstants.variables.authServicePort] || EnvironmentConstants.defaults.authServicePort
    );
  }
  static get AUTH_SERVICE_NAME(): string {
    return process.env[EnvironmentConstants.variables.authServiceName] || EnvironmentConstants.defaults.authServiceName;
  }
  static get RECIPE_SERIVCE_PORT(): number {
    return Number.parseInt(
      process.env[EnvironmentConstants.variables.recipeServicePort] || EnvironmentConstants.defaults.recipeServicePort
    );
  }
  static get RECIPE_SERVICE_NAME(): string {
    return (
      process.env[EnvironmentConstants.variables.recipeServiceName] || EnvironmentConstants.defaults.recipeServiceName
    );
  }
  static get DB_SERIVCE_PORT(): number {
    return Number.parseInt(
      process.env[EnvironmentConstants.variables.dbServicePort] || EnvironmentConstants.defaults.dbServicePort
    );
  }
  static get DB_SERVICE_NAME(): string {
    return process.env[EnvironmentConstants.variables.dbServiceName] || EnvironmentConstants.defaults.dbServiceName;
  }
  static get MEMCACHE_SERIVCE_PORT(): number {
    return Number.parseInt(
      process.env[EnvironmentConstants.variables.memcacheServicePort] ||
        EnvironmentConstants.defaults.memcacheServicePort
    );
  }
  static get MEMCACHE_SERVICE_NAME(): string {
    return (
      process.env[EnvironmentConstants.variables.memcacheServiceName] ||
      EnvironmentConstants.defaults.memcacheServiceName
    );
  }
}
