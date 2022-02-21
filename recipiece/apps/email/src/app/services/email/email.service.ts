import { Injectable } from '@nestjs/common';
import { IForgotPasswordEmailData, ISharedShoppingListEmailData, ISignupEmailData } from '@recipiece/memstore';
import { ForgotPasswordEmail, SharedShoppingListEmail, SignupEmail } from '../../api';

@Injectable()
export class EmailService {
  public async sendSignupEmail(body: ISignupEmailData) {
    const { to, data } = body;
    await new SignupEmail(to, data.token).send();
  }

  public async sendForgotPasswordEmail(body: IForgotPasswordEmailData) {
    const { to, data } = body;
    await new ForgotPasswordEmail(to, data.token).send();
  }

  public async sendSharedShoppingListEmail(body: ISharedShoppingListEmailData) {
    const { to, data } = body;
    await new SharedShoppingListEmail(to, data.listId, data.owner).send();
  }
}
