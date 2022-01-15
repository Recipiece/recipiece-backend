export class Environment {
  // db basics
  static readonly DB_HOST: string = process.env.RCP_DB_HOST || 'localhost';
  static readonly DB_PORT: number = Number.parseInt(process.env.RCP_DB_PORT || '27017');
  static readonly DB_PASSWORD: string = process.env.RCP_DB_PASS || 'test1234';
  static readonly DB_USER: string = process.env.RCP_DB_USER || 'recipiece';
  static readonly DB_NAME: string = process.env.RCP_DB_NAME || 'recipiece';
  static readonly DB_PAGE_SIZE: number = Number.parseInt(process.env.RCP_DB_PAGE_SIZE || '100');

  // memcache values
  static readonly MEMCACHE_HOST: string = process.env.RCP_MEM_HOST || 'localhost';
  static readonly MEMCACHE_PORT: number = Number.parseInt(process.env.RCP_MEM_PORT || '6379');
  // memcache exipry, in seconds
  static readonly MEMCACHE_EXP: number = Number.parseInt(process.env.RCP_MEM_EXP || '3600');

  // app config values
  static readonly APP_HOST: string = process.env.RCP_APP_HOST || '0.0.0.0';
  static readonly APP_PORT: number = Number.parseInt(process.env.RCP_APP_PORT || '8080');

  // whether or not we're running locally
  // 0 == false, 1 == true
  static readonly LOCAL: boolean = Number.parseInt(process.env.RCP_APP_LOCAL || '1') != 0;

  // email address to use for sending emails
  static readonly SUPPORT_EMAIL: string = process.env.RCP_SUPPORT_EMAIL || 'support@recipiece.org';

  // paypal values
  static readonly PAYPAL_HOST: string = process.env.RCP_PAYPAL_HOST || 'https://api-m.sandbox.paypal.com/v1';

  // service ports
  static readonly AUTH_SERIVCE_PORT: number = Number.parseInt(process.env.RCP_SRV_AUTH_PORT || '8801');
  static readonly AUTH_SERVICE_NAME: string = process.env.RCP_SRV_AUTH_NAME || 'auth';
  static readonly RECIPE_SERIVCE_PORT: number = Number.parseInt(process.env.RCP_SRV_RECIPE_PORT || '8802');
  static readonly RECIPE_SERVICE_NAME: string = process.env.RCP_SRV_AUTH_NAME || 'recipe';
  static readonly DB_SERIVCE_PORT: number = Number.parseInt(process.env.RCP_SRV_RECIPE_PORT || '9001');
  static readonly DB_SERVICE_NAME: string = process.env.RCP_SRV_AUTH_NAME || 'mongo';
}
