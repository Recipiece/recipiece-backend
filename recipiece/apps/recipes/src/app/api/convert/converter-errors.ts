import { BadRequestException } from "@nestjs/common";

export class UnknownUnitException extends BadRequestException {
  constructor(badUnit: string) {
    super(`Unknown unit ${badUnit} for conversion`);
  }
}


