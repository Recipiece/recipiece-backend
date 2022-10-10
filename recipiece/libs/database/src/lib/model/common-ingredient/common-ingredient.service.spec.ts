import { Test, TestingModule } from '@nestjs/testing';
import { Measure } from '@prisma/client';
import { PrismaService } from '../../prisma';
import { CommonIngredientService } from './common-ingredient.service';

describe('CommonIngredientService', () => {
  let service: CommonIngredientService;
  let prisma: PrismaService;

  let volumeMeasure: Measure;
  let weightMeasure: Measure;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonIngredientService, PrismaService],
    }).compile();

    service = module.get<CommonIngredientService>(CommonIngredientService);
    prisma = module.get(PrismaService);
  });

  beforeEach(async () => {
    await prisma.commonIngredient.deleteMany();
    await prisma.measure.deleteMany();
  });

  beforeEach(async () => {
    volumeMeasure = await prisma.measure.create({
      data: {
        id: 1,
        abbrs: ['c'],
        category: 'v',
        name_s: 'cup',
        name_p: 'cups',
        prefer_fractions: false,
        factor: 12.34,
      },
    });

    weightMeasure = await prisma.measure.create({
      data: {
        id: 2,
        abbrs: ['g'],
        category: 'g',
        name_s: 'gram',
        name_p: 'grams',
        prefer_fractions: false,
        factor: 43.21,
      },
    });
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('List', () => {
    it('should list the common ingredients', async () => {
      const ing01 = await prisma.commonIngredient.create({
        data: {
          names: ['test1', 'test2'],
          v_unit: volumeMeasure.name_s,
          v_amount: 1,
          w_unit: weightMeasure.name_s,
          w_amount: 2,
        },
      });

      const ing02 = await prisma.commonIngredient.create({
        data: {
          names: ['test3', 'test4'],
          v_unit: volumeMeasure.name_s,
          v_amount: 1,
          w_unit: weightMeasure.name_s,
          w_amount: 2,
        },
      });

      const listed = await service.list();
      expect(listed.length).toEqual(2);

      for (const listedIng of listed) {
        const matchingIng = listedIng.id === ing01.id ? ing01 : ing02;
        expect(listedIng.names).toEqual(matchingIng.names);
        expect(listedIng.v_unit).toEqual(matchingIng.v_unit);
        expect(listedIng.v_amount).toEqual(matchingIng.v_amount);
        expect(listedIng.w_unit).toEqual(matchingIng.w_unit);
        expect(listedIng.w_amount).toEqual(matchingIng.w_amount);
      }
    });
  });

  describe('List Names', () => {
    it('should list the common ingredient names', async () => {
      const ing01 = await prisma.commonIngredient.create({
        data: {
          names: ['test1', 'test2'],
          v_unit: volumeMeasure.name_s,
          v_amount: 1,
          w_unit: weightMeasure.name_s,
          w_amount: 2,
        },
      });

      const ing02 = await prisma.commonIngredient.create({
        data: {
          names: ['test3', 'test4'],
          v_unit: volumeMeasure.name_s,
          v_amount: 1,
          w_unit: weightMeasure.name_s,
          w_amount: 2,
        },
      });

      const listed = await service.listNames();

      expect(listed).toEqual([ing01.names[0], ing02.names[0]]);
    });
  });
});
