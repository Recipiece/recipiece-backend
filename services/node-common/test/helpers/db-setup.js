const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const EnvironmentConstants = require('../../src/constants/environment-contstants').EnvironmentConstants;

module.exports = async () => {
  await MongoMemoryServer.create({
    instance: {
      port: 4444,
      dbName: 'recipiece',
      auth: true,
    },
    auth: {
      customRootName: 'recipiece',
      customRootPwd: 'test1234',
    },
  });
  process.env[EnvironmentConstants.variables.dbPort] = '4444';
  process.env[EnvironmentConstants.variables.dbHost] = '127.0.0.1';
};
