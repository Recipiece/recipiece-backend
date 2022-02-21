import { BadRequestException, Body, ConflictException, Controller, HttpCode, Logger, NotFoundException, Post } from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { StagedUserService, UserService } from '@recipiece/database';
import { ISignupEmailData, PubsubService } from '@recipiece/memstore';
import { randomUUID } from 'crypto';
import { encryptPassword } from '../../api';

@Controller('staged-users')
export class StagedUsersController {
  constructor(
    private stagedUserService: StagedUserService,
    private userService: UserService,
    private pubsubService: PubsubService
  ) {}

  @Post('stage')
  public async stageUser(@Body() body: { username: string; email: string; password: string }) {
    const { username, email, password } = body;
    if (Utils.nou(username)) {
      throw new BadRequestException('Missing required field "username"');
    }
    if (Utils.nou(email)) {
      throw new BadRequestException('Missing required field "email"');
    }
    if (Utils.nou(password)) {
      throw new BadRequestException('Missing required field "password"');
    }

    // check that the email doesn't exist already on a user
    const fromUsername = await this.userService.getByUsername(username);
    if (!Utils.nou(fromUsername)) {
      throw new ConflictException();
    }

    const fromEmail = await this.userService.getByEmail(email);
    if (!Utils.nou(fromEmail)) {
      throw new ConflictException();
    }

    const pwBundle = await encryptPassword(password);
    try {
      const stagedUser = await this.stagedUserService.create({
        email: email,
        username: username,
        password: pwBundle.password,
        nonce: pwBundle.nonce,
        salt: pwBundle.salt,
        token: randomUUID(),
      });
      this.pubsubService.send<ISignupEmailData>('email:signup', { to: email, data: { token: stagedUser.token } });
      return stagedUser.asResponse();
    } catch (keyErr) {
      Logger.error(keyErr);
      throw new ConflictException();
    }
  }

  @Post('confirm')
  @HttpCode(204)
  public async confirmStagedUser(@Body() body: { token: string }) {
    const { token } = body;
    const stagedUser = await this.stagedUserService.findOne({
      token: token,
    });

    if (Utils.nou(stagedUser)) {
      throw new NotFoundException(`Token ${token} does not match any known record.`);
    }
    await this.userService.create({
      username: stagedUser.username,
      email: stagedUser.email,
      password: stagedUser.password,
      salt: stagedUser.salt,
      nonce: stagedUser.nonce,
      preferences: {},
    });
    await this.stagedUserService.delete(stagedUser.id);
  }
}
