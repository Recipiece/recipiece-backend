import { Injectable } from '@nestjs/common';
import { CommonIngredient, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma';

@Injectable()
export class CommonIngredientService {
  constructor(private prisma: PrismaService) {}

  public async list(query?: Prisma.CommonIngredientWhereInput): Promise<CommonIngredient[]> {
    return this.prisma.commonIngredient.findMany({
      where: { ...(query || {}) },
    });
  }

  public async listNames(): Promise<string[]> {
    const ingNamesOnly = await this.prisma.commonIngredient.findMany({
      select: {
        names: true,
      },
    });
    return ingNamesOnly.map((i) => i.names[0]);
  }
}
