import { IBaseModel } from '@common/model';
import { nou } from '@common/utils';
import { createEntity } from './create';
import { updateEntity } from './update';

export async function saveEntity<T extends IBaseModel>(c: string, entity: Partial<T>): Promise<Partial<T>> {
  if (nou(entity.id)) {
    return await createEntity(c, entity);
  } else {
    return await updateEntity(c, entity);
  }
}
