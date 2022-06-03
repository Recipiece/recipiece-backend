import {
  Body,
  Controller,
  Delete, ForbiddenException, HttpCode, NotImplementedException,
  Post,
  Req, UseGuards
} from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { SessionService, UserLoginService, UserService } from '@recipiece/database';
import { AuthenticationGuard, AuthRequest } from '@recipiece/middleware';
import { comparePasswords } from '../../api';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService, 
    private userLoginService: UserLoginService,
    private sessionService: SessionService
  ) {}

  @Post('login')
  @HttpCode(200)
  public async loginUser(@Body() body: { name: string; password: string }) {
    const { name, password } = body;
    const user = await this.userService.getByEmail(name);

    if(Utils.nou(user)) {
      throw new ForbiddenException();
    }

    const userLogin = await this.userLoginService.getForUser(user.id);

    if (!Utils.nou(user)) {
      const expectedPassword = userLogin.password_hash;
      const expectedSalt = userLogin.salt;
      const expectedNonce = userLogin.nonce;
      const passwordsMatch = await comparePasswords(password, expectedPassword, expectedSalt, expectedNonce);
      if (passwordsMatch) {
        const session = await this.sessionService.create(user.id);
        return {
          token: this.sessionService.serialize(session),
          user: user,
        };
      } else {
        throw new ForbiddenException();
      }
    } else {
      throw new ForbiddenException();
    }
  }

  @Post('logout')
  @HttpCode(204)
  @UseGuards(AuthenticationGuard)
  public async logoutUser(@Req() request: AuthRequest) {
    await this.sessionService.delete(request.session.id);
  }

  @Delete('delete-account')
  @UseGuards(AuthenticationGuard)
  public async requestAccountDeletion() {
    throw new NotImplementedException();
  }
}
