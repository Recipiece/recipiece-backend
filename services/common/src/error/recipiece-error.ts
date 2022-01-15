export class RecipieceError extends Error {
  constructor(
    public errorMessage = 'Internal Error.',
    public errorCode = 500,
  ) {
    super(errorMessage || 'Internal Error.');
  }

  public toJson() {
    return {
      message: this.errorMessage,
    }
  }
}
