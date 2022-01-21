import { RecipieceError } from './recipiece-error';

export class UnauthorizedError extends RecipieceError {
  constructor() {
    super('Access to this resource is protected.', 401);
  }
}
