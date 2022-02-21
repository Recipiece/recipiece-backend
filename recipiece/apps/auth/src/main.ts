import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Environment, EnvironmentSniffer } from '@recipiece/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  EnvironmentSniffer.load();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(Environment.AUTH_SERIVCE_PORT);
  Logger.log(`Auth is listening on ${Environment.AUTH_SERIVCE_PORT}`)
}

bootstrap();
