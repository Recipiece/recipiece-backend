import { EnvironmentConstants } from "../constants";
import { DockerEnvironment } from "./environment.docker";
import { LocalEnvironment } from "./environment.local";
import { ProdEnvironment } from "./environment.prod";

export class EnvironmentSniffer {
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

  static load() {
    if(EnvironmentSniffer.IS_DOCKER) {
      DockerEnvironment.load();
    } else if (EnvironmentSniffer.IS_PRODUCTION) {
      ProdEnvironment.load();
    } else {
      LocalEnvironment.load();
    }
  }
}
