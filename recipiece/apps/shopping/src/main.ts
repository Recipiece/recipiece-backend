/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import {Environment, EnvironmentSniffer} from '@recipiece/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  EnvironmentSniffer.load();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(Environment.SHOPPING_SERVICE_PORT);
  Logger.log(`Shopping service is listening on port ${Environment.SHOPPING_SERVICE_PORT}`);
}

bootstrap();
