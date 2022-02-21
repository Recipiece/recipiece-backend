export interface ISignupEmailData {
  to: string;
  data: { token: string };
}

export interface IForgotPasswordEmailData {
  to: string;
  data: { token: string };
}

export interface ISharedShoppingListEmailData {
  to: string;
  data: { listId: string; owner: string };
}
