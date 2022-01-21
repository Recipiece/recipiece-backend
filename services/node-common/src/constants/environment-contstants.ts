class EnvironmentDefaults {
  static readonly dbHost = 'mongodb';
  static readonly dbPort = '27017';
  static readonly dbPassword = 'test1234';
  static readonly dbName = 'recipiece';
  static readonly dbUser = 'recipiece';
  static readonly dbPageSize = '100';

  static readonly memcacheHost = 'memcachedb';
  static readonly memcachePort = '6379';
  static readonly memcacheExpiry = '3600';

  static readonly supportEmailAddress = 'support@recipiece.org';
  static readonly paypalHost = 'https://api-m.sandbox.paypal.com/v1';

  static readonly authServiceName = 'recipiece-auth';
  static readonly authServicePort = '8801';
  static readonly recipeServiceName = 'recipeice-recipes';
  static readonly recipeServicePort = '8802';
  static readonly dbServiceName = 'recipiece-database';
  static readonly dbServicePort = '7801';
  static readonly memcacheServiceName = 'recipiece-memcache';
  static readonly memcacheServicePort = '7802';

  static readonly internalUserToken = 'aW50ZXJuYWxAcmVjaXBpZWNlLm9yZy5pbnRlcm5hbEByZWNpcGllY2Uub3JnLjA=';
}

class EnvironmentVariables {
  static readonly dbHost = 'RCP_DB_HOST';
  static readonly dbPort = 'RCP_DB_PORT';
  static readonly dbPassword = 'RCP_DB_PASS';
  static readonly dbName = 'RCP_DB_NAME';
  static readonly dbUser = 'RCP_DB_USER';
  static readonly dbPageSize = 'RCP_DB_PAGE_SIZE';

  static readonly memcacheHost = 'RCP_MEM_HOST';
  static readonly memcachePort = 'RCP_MEM_PORT';
  static readonly memcacheExpiry = 'RCP_MEM_EXP';

  static readonly supportEmailAddress = 'SUPPORT_EMAIL';
  static readonly paypalHost = 'PAYPAL_HOST';

  static readonly authServicePort = 'RCP_SRV_AUTH_PORT';
  static readonly authServiceName = 'RCP_SRV_AUTH_NAME';
  static readonly recipeServiceName = 'RCP_SRV_RECIPE_NAME';
  static readonly recipeServicePort = 'RCP_SRV_RECIPE_PORT';
  static readonly dbServiceName = 'RCP_SRV_DB_NAME';
  static readonly dbServicePort = 'RCP_SRV_DB_PORT';
  static readonly memcacheServiceName = 'RCP_SRV_MEMCACHE_NAME';
  static readonly memcacheServicePort = 'RCP_SRV_MEMCACHE_PORT';

  static readonly internalUserToken = 'RCP_INTERNAL_USER';
}

export class EnvironmentConstants {
  static readonly variables = EnvironmentVariables;
  static readonly defaults = EnvironmentDefaults;
}
