class EnvironmentValues {
  public static get isProduction(): boolean {
    return process.env[EnvironmentVariables.envName] === 'prod';
  }
}

class EnvironmentVariables {
  static readonly appSecret = 'RCP_APP_SECRET';
  
  static readonly envName = 'RCP_ENV_NAME';
  static readonly dbHost = 'RCP_DB_HOST';
  static readonly dbPort = 'RCP_DB_PORT';
  static readonly dbPassword = 'RCP_DB_PASS';
  static readonly dbName = 'RCP_DB_NAME';
  static readonly dbUser = 'RCP_DB_USER';
  static readonly dbPageSize = 'RCP_DB_PAGE_SIZE';

  static readonly memcacheHost = 'RCP_REDIS_HOST';
  static readonly memcachePort = 'RCP_REDIS_PORT';
  static readonly memcacheExpiry = 'RCP_REDIS_EXP';

  static readonly supportEmailAddress = 'RCP_SUPPORT_EMAIL';
  static readonly mailjetSecret = 'RCP_MAILJET_SECRET';
  static readonly mailjetApiKey = 'RCP_MAILJET_API_KEY';
  static readonly paypalHost = 'RCP_PAYPAL_HOST';

  static readonly authServicePort = 'RCP_SRV_AUTH_PORT';
  static readonly authServiceName = 'RCP_SRV_AUTH_NAME';
  static readonly recipeServiceName = 'RCP_SRV_RECIPE_NAME';
  static readonly recipeServicePort = 'RCP_SRV_RECIPE_PORT';
  static readonly shoppingServiceName = 'RCP_SRV_SHOPPING_NAME';
  static readonly shoppingServicePort = 'RCP_SRV_SHOPPING_PORT'
  static readonly dbServiceName = 'RCP_SRV_DB_NAME';
  static readonly dbServicePort = 'RCP_SRV_DB_PORT';
  static readonly memcacheServiceName = 'RCP_SRV_MEMCACHE_NAME';
  static readonly memcacheServicePort = 'RCP_SRV_MEMCACHE_PORT';
  static readonly emailServicePort = 'RCP_SRV_EMAIL_PORT';
  static readonly emailServiceName = 'RCP_SRV_EMAIL_NAME';

  static readonly internalUserToken = 'RCP_INTERNAL_USER';
}

export class EnvironmentConstants {
  static readonly variables = EnvironmentVariables;
  static readonly values = EnvironmentValues;
}
