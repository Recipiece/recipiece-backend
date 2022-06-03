import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(+process.env.AUTH_SERIVCE_PORT);
  Logger.log(`Auth is listening on ${process.env.AUTH_SERIVCE_PORT}`)
}

bootstrap();
