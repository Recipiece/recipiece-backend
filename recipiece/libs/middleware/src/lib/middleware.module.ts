import { Module } from '@nestjs/common';
import { DatabaseModule } from '@recipiece/database';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class MiddlewareModule {}
