import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  IForgotPasswordEmailData,
  ISharedShoppingListEmailData,
  ISignupEmailData,
  PubsubService,
} from '@recipiece/memstore';
import { EmailService } from './app/services';
import { EnvironmentConstants } from '@recipiece/common';

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
  const app = await NestFactory.create(AppModule);
  const port = +process.env[EnvironmentConstants.variables.emailServicePort]
  await app.listen(port);
  bootstrapPubsub(app);
  Logger.log(`Email listening on ${port}`);
}

bootstrap();
