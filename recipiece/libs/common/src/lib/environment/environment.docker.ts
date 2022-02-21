import { EnvironmentConstants } from "../constants";

export class DockerEnvironment {
  public static load() {
    process.env[EnvironmentConstants.variables.appSecret] = '3wjmPkj1GOowpNHwdCC37ObB4ABS0n4z';

    process.env[EnvironmentConstants.variables.dbHost] = 'mongodb';
    process.env[EnvironmentConstants.variables.dbPort] = '27017';
    process.env[EnvironmentConstants.variables.dbPassword] = 'test1234';
    process.env[EnvironmentConstants.variables.dbName] = 'recipiece';
    process.env[EnvironmentConstants.variables.dbUser] = 'recipiece';
    process.env[EnvironmentConstants.variables.dbPageSize] = '100';

    process.env[EnvironmentConstants.variables.memcacheHost] = 'memcachedb';
    process.env[EnvironmentConstants.variables.memcachePort] = '6379';
    process.env[EnvironmentConstants.variables.memcacheExpiry] = '3600';

    process.env[EnvironmentConstants.variables.supportEmailAddress] = 'support@recipiece.org';
    process.env[EnvironmentConstants.variables.mailjetSecret] = 'nonsense-secret';
    process.env[EnvironmentConstants.variables.mailjetApiKey] = 'nonsense-api-key';

    process.env[EnvironmentConstants.variables.authServicePort] = '8801';
    process.env[EnvironmentConstants.variables.authServiceName] = 'recipiece-auth';

    process.env[EnvironmentConstants.variables.recipeServicePort] = '8802';
    process.env[EnvironmentConstants.variables.recipeServiceName] = 'recipiece-recipes';

    process.env[EnvironmentConstants.variables.emailServicePort] = '7801';
    process.env[EnvironmentConstants.variables.emailServiceName] = 'recipiece-email';
  }
}