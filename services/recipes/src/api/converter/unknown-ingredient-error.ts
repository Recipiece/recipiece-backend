import { RecipieceError } from "recipiece-common";

export class UnknownIngredientError extends RecipieceError {
  constructor(ingName: string) {
    super(`Could not match ingredient ${ingName}`, 400);
  }
}