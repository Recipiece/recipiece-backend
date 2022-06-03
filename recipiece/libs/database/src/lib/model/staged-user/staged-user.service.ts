import { Injectable } from '@nestjs/common';
import { StagedUser } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StagedUserService {
  constructor(private prisma: PrismaService) {}

  public async create(model: Partial<StagedUser>): Promise<StagedUser> {
    return await this.prisma.stagedUser.create({
      data: {
        email: model.email,
        password_hash: model.password_hash,
        salt: model.salt,
        nonce: model.nonce,
        token: model.token,
        permission_level: model.permission_level,
      },
    });
  }

  public async delete(id: number) {
    return this.prisma.stagedUser.delete({
      where: {
        id: id,
      },
    });
  }

  public getByToken(token: string): Promise<StagedUser | undefined> {
    return this.prisma.stagedUser.findUnique({
      where: {
        token: token,
      },
    });
  }
}
