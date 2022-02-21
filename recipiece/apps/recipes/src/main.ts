import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Environment, EnvironmentSniffer } from '@recipiece/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  EnvironmentSniffer.load();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(Environment.RECIPE_SERIVCE_PORT);
  Logger.log(`Recipe service is listening on port ${Environment.RECIPE_SERIVCE_PORT}`);
}

bootstrap();
