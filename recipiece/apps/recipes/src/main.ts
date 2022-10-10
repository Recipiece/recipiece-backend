import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EnvironmentConstants } from '@recipiece/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const port = +process.env[EnvironmentConstants.variables.recipeServicePort];
  await app.listen(port);
  Logger.log(`Recipe service is listening on port ${port}`);
}

bootstrap();
