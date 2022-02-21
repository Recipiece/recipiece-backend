import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { AuthorizationGuard } from '@recipiece/middleware';

@WebSocketGateway()
@UseGuards(AuthorizationGuard)
export class ShoppingListGateway {
  @SubscribeMessage('list_changed')
  public async handleListChanged(client: any, payload: any): Promise<string> {
    return 'Hello world!';
  }
}
