import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Utils } from '@recipiece/common';
import { IRecipeIngredient } from '@recipiece/database';
import { ConverterApiService, UnknownUnitException } from '../../api';
import Fraction from 'fraction.js';

@Controller('convert')
export class ConvertController {
  constructor(private converterApi: ConverterApiService) {}

  @Post('ingredient')
  @HttpCode(200)
  public async convertIngredient(@Body() body: { ingredient: IRecipeIngredient; to: string }) {
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
    if (sourceMeasure.cat !== destMeasure.cat) {
      convertedAmount = await this.converterApi.convertDifferentUnitCategories(ingredient, sourceMeasure, destMeasure);
    } else {
      convertedAmount = this.converterApi.convertSameUnitCategories(ingredient.amount, sourceMeasure, destMeasure);
    }

    // try and nicely convert the value back to a fraction, if it ~should~ be one
    let amount = convertedAmount.toString(10);
    if (destMeasure.preferFractions) {
      amount = new Fraction(Math.round(16 * convertedAmount), 16).toFraction();
    }

    return {
      ingredient: {
        ...ingredient,
        unit: convertedAmount === 1 ? destMeasure.name.s : destMeasure.name.p,
        amount: amount,
      },
      from: sourceMeasure,
      to: destMeasure,
    };
  }
}
