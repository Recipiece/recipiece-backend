import { RecipieceError } from "./recipiece-error";

export class NotFoundError extends RecipieceError {
  constructor(entityId: string) {
    super(`Entity with id '${entityId}' not found.`, 404);
  }
}
