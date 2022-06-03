import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Logger,
  NotFoundException,
  Post
} from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { StagedUserService, UserLoginService, UserPermissionsService, UserService } from '@recipiece/database';
import { ISignupEmailData, PubsubService } from '@recipiece/memstore';
import { randomUUID } from 'crypto';
import { encryptPassword } from '../../api';

@Controller('staged-users')
export class StagedUsersController {
  constructor(
    private stagedUserService: StagedUserService,
    private userService: UserService,
    private userLoginService: UserLoginService,
    private userPermissionService: UserPermissionsService,
    private pubsubService: PubsubService
  ) {}

  @Post('stage')
  public async stageUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const fromEmail = await this.userService.getByEmail(email);
    if (!Utils.nou(fromEmail)) {
      throw new ConflictException();
    }

    const pwBundle = await encryptPassword(password);
    try {
      const stagedUser = await this.stagedUserService.create({
        email: email,
        password_hash: pwBundle.password,
        nonce: pwBundle.nonce,
        salt: pwBundle.salt,
        token: randomUUID(),
        permission_level: '',
      });
      this.pubsubService.send<ISignupEmailData>('email:signup', { to: email, data: { token: stagedUser.token } });
      return {};
    } catch (keyErr) {
      Logger.error(keyErr);
      throw new ConflictException();
    }
  }

  @Post('confirm')
  @HttpCode(204)
  public async confirmStagedUser(@Body() body: { token: string }) {
    const { token } = body;
    const stagedUser = await this.stagedUserService.getByToken(token);

    if (!stagedUser) {
      throw new NotFoundException(`Unknown token ${token}`);
    }

    const user = await this.userService.create({
      email: stagedUser.email,
      preferences: {},
    });

    await this.userLoginService.create(user.id, {
      password_hash: stagedUser.password_hash,
      salt: stagedUser.salt,
      nonce: stagedUser.nonce,
    });

    await this.userPermissionService.create(user.id, {
      level: stagedUser.permission_level,
    });

    await this.stagedUserService.delete(stagedUser.id);

    return user;
  }
}
