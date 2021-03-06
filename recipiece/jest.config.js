const { getJestProjects } = require('@nrwl/jest');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env.test') });

module.exports = {
  projects: getJestProjects(),
};
