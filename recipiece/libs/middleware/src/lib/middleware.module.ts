import { Module } from '@nestjs/common';
import { DatabaseModule } from '@recipiece/database';
import { AuthenticationGuard, AuthorizationGuard } from './guards';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [AuthenticationGuard, AuthorizationGuard],
  exports: [AuthenticationGuard, AuthorizationGuard],
})
export class MiddlewareModule {}
