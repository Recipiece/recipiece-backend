export interface IBaseModel {
  id?: string;
  created?: number;
}

export interface IBaseUserOwnedModel extends IBaseModel {
  owner: string;
}

export interface ResponseProvider<T extends IBaseModel> {
  asResponse: () => Partial<T & {id?: string, owner?: string}>;
}
