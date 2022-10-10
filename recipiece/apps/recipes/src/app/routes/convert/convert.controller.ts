import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { RecipeIngredient } from '@recipiece/database';
import { AuthenticationGuard } from '@recipiece/middleware';
import Fraction from 'fraction.js';
import { ConverterApiService, UnknownUnitException } from '../../api';

@Controller('convert')
@UseGuards(AuthenticationGuard)
export class ConvertController {
  constructor(private converterApi: ConverterApiService) {}

  @Post('ingredient')
  @HttpCode(200)
  public async convertIngredient(@Body() body: { ingredient: RecipeIngredient; to: string }) {
    const { ingredient, to: desiredUnitName } = body;

    if (Utils.nou(ingredient.unit)) {
      throw new UnknownUnitException('undefined');
    }

    // try and find the units from the ingredient and the desired unit
    const sourceMeasure = await this.converterApi.findMeasure(ingredient.unit);

    if (Utils.nou(sourceMeasure)) {
      throw new UnknownUnitException(ingredient.unit);
    }

    const destMeasure = await this.converterApi.findMeasure(desiredUnitName);

    if (Utils.nou(destMeasure)) {
      throw new UnknownUnitException(desiredUnitName);
    }

    let convertedAmount: number;
    if (sourceMeasure.category !== destMeasure.category) {
      convertedAmount = await this.converterApi.convertDifferentUnitCategories(ingredient, sourceMeasure, destMeasure);
    } else {
      convertedAmount = this.converterApi.convertSameUnitCategories(ingredient.amount, sourceMeasure, destMeasure);
    }

    // try and nicely convert the value back to a fraction, if it ~should~ be one
    let amount = convertedAmount.toString(10);
    if (destMeasure.prefer_fractions) {
      amount = new Fraction(Math.round(16 * convertedAmount), 16).toFraction();
    }

    return {
      ingredient: {
        ...ingredient,
        unit: convertedAmount === 1 ? destMeasure.name_s : destMeasure.name_p,
        amount: amount,
      },
      from: sourceMeasure,
      to: destMeasure,
    };
  }
}
