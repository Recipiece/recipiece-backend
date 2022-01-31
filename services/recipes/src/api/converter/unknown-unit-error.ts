import { RecipieceError } from 'recipiece-common';

export class UnknownUnitError extends RecipieceError {
  constructor(unit: string) {
    super(`Unknown unit ${unit}`, 400);
  }
}
