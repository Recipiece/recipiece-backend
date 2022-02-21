import {
  Body,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  NotImplementedException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { SessionService, UserService } from '@recipiece/database';
import { AuthorizationGuard, AuthRequest } from '@recipiece/middleware';
import { comparePasswords } from '../../api';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService, private sessionService: SessionService) {}

  @Post('login')
  @HttpCode(200)
  public async loginUser(@Body() body: { name: string; password: string }) {
    const { name, password } = body;
    const user = await this.userService.findOne({
      $or: [{ email: name }, { username: name }],
    });

    if (!Utils.nou(user)) {
      const expectedPassword = user.password;
      const expectedSalt = user.salt;
      const expectedNonce = user.nonce;
      const passwordsMatch = await comparePasswords(password, expectedPassword, expectedSalt, expectedNonce);
      if (passwordsMatch) {
        const session = await this.sessionService.save({
          owner: user.id,
        });
        await this.sessionService.save(session);
        return {
          token: session.serialize(),
          user: user.asResponse(),
        };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new NotFoundException(`Username or email ${name} does not exist.`);
    }
  }

  @Post('logout')
  @HttpCode(204)
  @UseGuards(AuthorizationGuard)
  public async logoutUser(@Req() request: AuthRequest) {
    await this.sessionService.delete(request.session.id);
  }

  @Delete('delete-account')
  @UseGuards(AuthorizationGuard)
  public async requestAccountDeletion() {
    throw new NotImplementedException();
  }
}
