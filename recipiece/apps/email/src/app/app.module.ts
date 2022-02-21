import { Module } from '@nestjs/common';
import { MemstoreModule } from '@recipiece/memstore';
import { EmailService } from './services';

@Module({
  imports: [MemstoreModule],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
