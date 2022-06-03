import { Injectable } from '@nestjs/common';
import { UserPermissions } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserPermissionsService {
  constructor(private prisma: PrismaService) {}

  public async getForUser(owner: number): Promise<UserPermissions> {
    return await this.prisma.userPermissions.findUnique({
      where: {
        owner_id: owner,
      },
    });
  }

  public create(owner: number, model: Partial<UserPermissions>): Promise<UserPermissions> {
    return this.prisma.userPermissions.create({
      data: {
        owner_id: owner,
        level: model.level,
      },
    });
  }

  public async update(id: number, model: Partial<UserPermissions>): Promise<UserPermissions> {
    return await this.prisma.userPermissions.update({
      where: {
        id: id,
      },
      data: {
        level: model.level,
      },
    });
  }
}
