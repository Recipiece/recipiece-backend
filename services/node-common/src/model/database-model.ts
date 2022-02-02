import { IBaseModel } from '.';
import { deleteEntity, saveEntity } from '../interop/db-interop';
import { utcNow } from '../utils';

export abstract class DatabaseModel<T extends IBaseModel> implements IBaseModel {
  public get _id(): string | undefined {
    return this.model._id;
  }
  public set _id(value: string | undefined) {
    this.model._id = value;
  }

  public get created(): number {
    return this.model.created;
  }

  public set created(c: number) {
    this.model.created = c;
  }

  public readonly model: T;

  protected constructor(public collection: string, private factory: (d: any) => any, json: Partial<T>) {
    this.model = {
      _id: json._id,
      created: json.created,
      ...json,
    } as T;
  }

  public async save<K extends DatabaseModel<T>>(): Promise<K> {
    return this.factory(await saveEntity<T, any>(this));
  }

  public async delete() {
    await deleteEntity(this);
  }

  public abstract asJson(): Partial<T>;
}
