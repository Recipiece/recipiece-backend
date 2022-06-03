import { Injectable } from '@nestjs/common';
import { Measure } from '@prisma/client';
import { PrismaService } from '../../prisma';

@Injectable()
export class MeasureService {
  constructor(private prisma: PrismaService) {}

  public async list(): Promise<Measure[]> {
    return this.prisma.measure.findMany();
  }
}
