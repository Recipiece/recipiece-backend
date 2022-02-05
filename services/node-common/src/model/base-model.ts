export interface IBaseModel {
  id: string;
  created: number;
}

export interface IBaseUserOwnedModel extends IBaseModel {
  owner: string;
}

export interface AsJsonProvider<T extends IBaseModel> {
  asJson(): Partial<T & { id: string }>;
}
