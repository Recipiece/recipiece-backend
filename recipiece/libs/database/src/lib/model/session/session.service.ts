import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  public async create(owner: number): Promise<Session> {
    return this.prisma.session.create({
      data: {
        owner_id: owner,
        token: randomUUID(),
      },
    });
  }

  public async delete(id: number) {
    return this.prisma.session.deleteMany({
      where: {
        id: id,
      },
    });
  }

  public async deleteAllForUser(owner: number) {
    return this.prisma.session.deleteMany({
      where: {
        owner_id: owner,
      },
    });
  }

  public serialize(session: Session): string {
    const sessionStr = `${session.id}.${session.token}.${session.owner_id}`;
    return Buffer.from(sessionStr, 'ascii').toString('base64');
  }

  public async deserialize(session: string): Promise<Session | undefined> {
    const decoded = Buffer.from(session, 'base64').toString('ascii');
    const parts = decoded.split('.');
    return this.prisma.session.findFirst({
      where: {
        id: +parts[0],
      },
    });
  }
}
