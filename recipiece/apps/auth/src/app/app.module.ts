import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from '@recipiece/database';
import { MemstoreModule } from '@recipiece/memstore';
import { RecipieceAuthMiddleware } from '@recipiece/middleware';
import { PasswordController } from './routes/password/password.controller';
import { StagedUsersController } from './routes/staged-users/staged-users.controller';
import { UsersController } from './routes/users/users.controller';

@Module({
  imports: [DatabaseModule, MemstoreModule],
  controllers: [PasswordController, StagedUsersController, UsersController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RecipieceAuthMiddleware).forRoutes('password/reset', 'users/logout', 'users/delete-account');
  }
}
