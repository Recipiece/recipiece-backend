import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CommonIngredient,
  CommonIngredientService,
  Measure,
  MeasureService,
  RecipeIngredient,
} from '@recipiece/database';
import { MemcacheService } from '@recipiece/memstore';
import Fraction from 'fraction.js';
import FuzzySet from 'fuzzyset.js';

@Injectable()
export class ConverterApiService {
  constructor(
    private memcache: MemcacheService,
    private measureService: MeasureService,
    private commonIngredientService: CommonIngredientService
  ) {}

  public async convertDifferentUnitCategories(
    ingredient: RecipeIngredient,
    source: Measure,
    dest: Measure
  ): Promise<number> {
    // try to find the ingredient in the common ingredients
    const commonIngredientNames = await this.listRcpCommonIngredientNames();
    const fuzzySet = FuzzySet(commonIngredientNames);
    const matches = fuzzySet.get(ingredient.name.toLowerCase().trim(), [], 0.9);
    if (matches.length === 0) {
      throw new BadRequestException(`Unknown ingredient ${ingredient.name}`);
    }

    const bestMatchName = matches[0][1];
    // fetch the common ingredient for that name
    const commonIngResults = await this.commonIngredientService.list({
      names: {
        hasEvery: [bestMatchName],
      },
    });
    if (commonIngResults.length === 0) {
      throw new InternalServerErrorException();
    }

    let amount: number;

    const commonIngredient = commonIngResults[0];
    const normalCat = commonIngredient[source.category];
    const oppositeCat = commonIngredient[source.category === 'v' ? 'w' : 'v'];
    // convert the recipe ingredient over to the common ingredient's matching category
    const destCommon = await this.findMeasure(commonIngredient[source.category].unit);
    amount = this.convertSameUnitCategories(ingredient.amount, source, destCommon);
    // pass the amount over to the other category in the common ingredient
    amount = (amount * oppositeCat.amount) / normalCat.amount;
    // take it from the common src, to the desired dest
    const srcCommon = await this.findMeasure(oppositeCat.unit);
    amount = this.convertSameUnitCategories(amount, srcCommon, dest);
    return amount;
  }

  public convertSameUnitCategories(amount: string | number, source: Measure, dest: Measure): number {
    // easy peasy, just do the math
    const floatyAmount = new Fraction(amount).valueOf();
    return (floatyAmount * source.factor) / dest.factor;
  }

  public async findMeasure(unitName: string): Promise<Measure> {
    const measures = await this.listRcpMeasures();
    return measures.find((m) => {
      m.abbrs.includes(unitName) || m.name_s.includes(unitName) || m.name_p.includes(unitName);
    });
  }

  public async listRcpMeasures(): Promise<Measure[]> {
    return this.memcache.mgetset('measures', () => this.measureService.list());
  }

  public async listRcpCommonIngredients(): Promise<CommonIngredient[]> {
    return this.memcache.mgetset('common-ingredients', () => this.commonIngredientService.list());
  }

  public async listRcpCommonIngredientNames(): Promise<string[]> {
    return this.memcache.mgetset('common-ingredient-names', () => this.commonIngredientService.listNames());
  }
}
