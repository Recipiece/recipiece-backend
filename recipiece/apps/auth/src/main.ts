import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EnvironmentConstants } from '@recipiece/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const port = +process.env[EnvironmentConstants.variables.authServicePort]

  await app.listen(port);
  Logger.log(`Auth is listening on ${port}`);
}

bootstrap();
