import { PrismaClient } from "@prisma/client";

export abstract class NestedUpdater<T extends {id?: number}> {
  constructor(private prisma: PrismaClient) {

  }

  protected abstract mapCreateData(entity: T): Partial<T>;

  protected abstract mapUpdateData(entity: T): Partial<T>;

  public async update(entities: T[], prismaType: string): Promise<T[]> {
    const knownEntities = entities.filter((i) => !!i.id);
    const unknownEntities = entities.filter((i) => i.id === null || i.id === undefined);

    const entitiesRet: T[] = [];

    if (knownEntities.length > 0) {
      // delete all ingredients not present in the array first
      const knownIds = knownEntities.map((i) => i.id);
      await this.prisma[prismaType].deleteMany({
        where: {
          id: {
            notIn: knownIds,
          },
        },
      });

      const updated = await this.prisma.$transaction(
        knownEntities.map((i) => {
          return this.prisma[prismaType].update({
            where: {
              id: i.id,
            },
            data: this.mapUpdateData(i),
          });
        })
      );
      entitiesRet.push(...updated);
    }

    if (unknownEntities.length > 0) {
      // create all ingredients that didn't have an id
      const created = await this.prisma.$transaction(
        unknownEntities.map((i) => {
          return this.prisma[prismaType].create({
            data: this.mapCreateData(i),
          });
        })
      );
      entitiesRet.push(...created);
    }

    return entitiesRet;
  }
}
