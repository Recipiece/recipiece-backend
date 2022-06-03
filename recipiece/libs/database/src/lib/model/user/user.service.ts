import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async getByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async getById(id: number): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async delete(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  public create(model: Partial<User>): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: model.email,
        preferences: model.preferences || {},
      },
    });
  }
}
