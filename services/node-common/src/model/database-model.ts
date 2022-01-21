import { IBaseModel } from '.';
import { deleteEntity, saveEntity } from '../interop/db-interop';
import { utcNow } from '../utils';

export abstract class DatabaseModel<T extends IBaseModel> implements IBaseModel {
  _id: string | undefined;
  created: number;

  protected constructor(public collection: string, json?: Partial<T>) {
    this._id = json?._id;
    this.created = json?.created ?? utcNow();
  }

  public async save(): Promise<T> {
    return await saveEntity(this);
  }

  public async delete() {
    await deleteEntity(this);
  }

  public abstract asModel(): Partial<T>;
}
