import { RecipieceError } from './recipiece-error';

export class ForbiddenError extends RecipieceError {
  constructor() {
    super('Access Forbidden.', 403);
  }
}
