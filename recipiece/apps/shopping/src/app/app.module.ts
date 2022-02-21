import { Module } from '@nestjs/common';
import { ShoppingListService } from './api';
import { ShoppingListGateway } from './sockets';
import { MiddlewareModule } from '@recipiece/middleware';

@Module({
  imports: [MiddlewareModule],
  controllers: [],
  providers: [ShoppingListGateway, ShoppingListService],
})
export class AppModule {}
