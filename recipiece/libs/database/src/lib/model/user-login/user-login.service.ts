import { Injectable } from '@nestjs/common';
import { UserLogin } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserLoginService {
  constructor(private prisma: PrismaService) {}

  public async getForUser(owner: number): Promise<UserLogin> {
    return this.prisma.userLogin.findUnique({
      where: {
        owner_id: owner,
      },
    });
  }

  public create(owner: number, model: Partial<UserLogin>): Promise<UserLogin> {
    return this.prisma.userLogin.create({
      data: {
        owner_id: owner,
        password_hash: model.password_hash,
        salt: model.salt,
        nonce: model.nonce,
      },
    });
  }

  public async update(id: number, model: Partial<UserLogin>): Promise<UserLogin> {
    return this.prisma.userLogin.update({
      where: {
        id: id,
      },
      data: {
        password_hash: model.password_hash,
        salt: model.salt,
        nonce: model.nonce,
      },
    });
  }
}
