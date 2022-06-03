import { Prisma } from '@prisma/client';
import { Utils } from '@recipiece/common';
import { AuthRequest } from '@recipiece/middleware';
import { Request } from 'express';

export class CookbookQuery {
  private query: Prisma.CookbookWhereInput;

  constructor() {
    this.query = {};
  }

  public fromRequest(request: AuthRequest): Prisma.CookbookWhereInput {
    this.setNameReq(request);
    this.setOwnerReq(request);
    return { ...this.query };
  }

  public setOwnerReq(request: AuthRequest) {
    this.setOwner(request.user.id);
  }

  public setOwner(owner: number) {
    this.query.owner_id = owner;
  }

  public setNameReq(request: Request) {
    const name = request.query?.name;
    if (!Utils.nou(name)) {
      this.setName(name as string);
    }
  }

  public setName(name: string) {
    this.query.name = {
      contains: name,
      mode: 'insensitive',
    };
  }
}
