/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Environment, EnvironmentSniffer } from '@recipiece/common';
import {
  IForgotPasswordEmailData,
  ISharedShoppingListEmailData,
  ISignupEmailData,
  PubsubService,
} from '@recipiece/memstore';
import { EmailService } from './app/services';

function bootstrapPubsub(app: INestApplication) {
  const pubsub = app.get(PubsubService);
  const emailService = app.get(EmailService);

  pubsub.subscribe<ISignupEmailData>('email:signup', (data) => {
    emailService.sendSignupEmail(data);
  });

  pubsub.subscribe<IForgotPasswordEmailData>('email:forgot-password', (data) => {
    emailService.sendForgotPasswordEmail(data);
  });

  pubsub.subscribe<ISharedShoppingListEmailData>('email:shared-list', (data) => {
    emailService.sendSharedShoppingListEmail(data);
  });
}

async function bootstrap() {
  EnvironmentSniffer.load();
  const app = await NestFactory.create(AppModule);
  await app.listen(Environment.EMAIL_SERVICE_PORT);
  bootstrapPubsub(app);
  Logger.log(`Email listening on ${Environment.EMAIL_SERVICE_PORT}`);
}

bootstrap();
