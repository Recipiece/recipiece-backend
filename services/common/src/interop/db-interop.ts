import { Endpoints } from '../constants/endpoint-constants';
import { IBaseModel } from '../model/base-model.i';
import { DatabaseModel } from '../model/database-model';
import { IInteropRequest } from './interop.i';

export async function fetchDb<T>(args: IInteropRequest): Promise<Partial<T>> {
  // const formedUrl = `http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}${args.endpoint}`;
  // console.log(formedUrl)
  // const response = await fetch(formedUrl, buildRequest(args));
  // return await response.json();
  return {};
}

export async function saveEntity<K extends IBaseModel, T extends DatabaseModel<K>>(entity: T): Promise<Partial<K>> {
  return await fetchDb({
    endpoint: `/${entity.collection}/${Endpoints.database.save}`,
    requestData: {
      method: 'POST',
      body: JSON.stringify(entity.asModel()),
    },
  });
}

export async function queryEntity<K extends IBaseModel>(collection: string, query: any): Promise<Partial<K>> {
  return await fetchDb({
    endpoint: `/${collection}/${Endpoints.database.query}`,
    requestData: {
      method: 'GET',
      body: JSON.stringify(query),
    },
  });
}

export async function getEntityById<K extends IBaseModel>(collection: string, id: string): Promise<Partial<K>> {
  return await queryEntity(collection, { id: id });
}

export async function deleteEntity<K extends IBaseModel, T extends DatabaseModel<K>>(entity: T): Promise<any> {
  return await fetchDb({
    endpoint: `/${entity.collection}/${Endpoints.database.delete}`,
    requestData: {
      method: 'DELETE',
      body: JSON.stringify(entity.asModel()),
    },
  });
}
