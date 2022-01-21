import { RecipieceError } from "./recipiece-error";

export class BadRequestError extends RecipieceError {
  constructor(badKey: string, badValue: string) {
    super(`Malformed Request at key '${badKey}' with value ${badValue}.`, 400);
  }
}