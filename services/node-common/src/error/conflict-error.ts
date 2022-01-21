import { RecipieceError } from './recipiece-error';

export class ConflictError extends RecipieceError {
  constructor() {
    super('An entity with this information already exists.', 409);
  }
}
