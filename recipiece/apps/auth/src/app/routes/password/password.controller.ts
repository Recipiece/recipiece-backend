import { Body, Controller, HttpCode, NotFoundException, Post, Req, UnauthorizedException } from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { ForgotPasswordTokenService, SessionService, UserService } from '@recipiece/database';
import { IForgotPasswordEmailData, PubsubService } from '@recipiece/memstore';
import { AuthRequest } from '@recipiece/middleware';
import { randomUUID } from 'crypto';
import { comparePasswords, encryptPassword } from '../../api';

@Controller('password')
export class PasswordController {
  constructor(
    private forgotPasswordTokenService: ForgotPasswordTokenService,
    private sessionService: SessionService,
    private userService: UserService,
    private pubsubService: PubsubService
  ) {}

  @Post('forgot-password/request')
  @HttpCode(204)
  public async requestForgotPasswordToken(@Body() body: { email: string }) {
    const { email } = body;
    const user = await this.userService.getByEmail(email);
    if (Utils.nou(user)) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    const token = randomUUID();
    await this.forgotPasswordTokenService.create({
      token: token,
      owner: user.id,
    });

    this.pubsubService.send<IForgotPasswordEmailData>('email:forgot-password', { to: email, data: { token } });
  }

  @Post('forgot-password/reset')
  @HttpCode(204)
  public async resetForgottenPassword(@Body() body: { token: string; email: string; desired: string }) {
    const { token, email, desired } = body;
    const user = await this.userService.getByEmail(email);
    if (Utils.nou(user)) {
      throw new UnauthorizedException();
    }
    const forgotPasswordToken = await this.forgotPasswordTokenService.findOne({
      token: token,
      owner: user.id,
    });
    if (Utils.nou(forgotPasswordToken)) {
      throw new UnauthorizedException();
    }
    const newPwBundle = await encryptPassword(desired);
    user.nonce = newPwBundle.nonce;
    user.password = newPwBundle.password;
    user.salt = newPwBundle.salt;

    await this.forgotPasswordTokenService.deleteMany({ owner: user.id });
    await this.sessionService.deleteMany({ owner: user.id });
    await this.userService.update(user.id, user);
  }

  @Post('reset')
  @HttpCode(204)
  public async resetKnownPassword(@Req() request: AuthRequest) {
    const { old, desired } = request.body;
    const user = request.user;
    const { salt, nonce, password } = user;
    if (await comparePasswords(old, password, salt, nonce)) {
      const newPwBundle = await encryptPassword(desired);
      user.nonce = newPwBundle.nonce;
      user.password = newPwBundle.password;
      user.salt = newPwBundle.salt;

      await this.sessionService.deleteMany({ owner: user.id });

      await this.userService.update(user.id, user);
    } else {
      throw new UnauthorizedException();
    }
  }
}
