import axios, { AxiosRequestConfig } from 'axios';
import { Environment } from '../environment';
import { IBaseModel } from '../model/base-model.i';
import { DatabaseModel } from '../model/database-model';
import { IPagedResult } from '../model/paged-result';
import { getAuthHeader } from './util';

export async function dbRequest<RequestT, ResponseT>(request: AxiosRequestConfig<RequestT>): Promise<ResponseT> {
  const fullRequest: AxiosRequestConfig<RequestT> = {
    ...request,
    url: `http://${Environment.DB_SERVICE_NAME}:${Environment.DB_SERIVCE_PORT}${request.url}`,
    headers: {
      ...(request.headers || {}),
      ...getAuthHeader(),
    },
  };
  const response = await axios.request(fullRequest);
  return response.data;
}

export async function saveEntity<K extends IBaseModel, T extends DatabaseModel<K>>(entity: T): Promise<K> {
  const dbOp = entity._id ? 'update-one' : 'insert-one';
  const url = `/${entity.collection}/${dbOp}`;
  let response;
  if (dbOp === 'insert-one') {
    response = await dbRequest({
      url: url,
      method: 'POST',
      data: {
        data: entity.asModel(),
      },
    });
  } else {
    response = await dbRequest({
      url: url,
      method: 'POST',
      data: {
        data: entity.asModel(),
        query: {
          _id: entity._id,
        },
      },
    });
  }
  return (response as {data: K}).data;
}

export async function queryEntity<K extends IBaseModel>(collection: string, query: any): Promise<IPagedResult<K>> {
  return await dbRequest({
    url: `/${collection}/find`,
    method: 'POST',
    data: { query },
  });
}

export async function getEntityById<K extends IBaseModel>(collection: string, id: string): Promise<K> {
  const response = await dbRequest({
    url: `/${collection}/find-one`,
    method: 'POST',
    data: {
      query: {
        _id: id,
      },
    },
  });
  return (response as {data: K}).data;
}

export async function deleteEntity<K extends IBaseModel, T extends DatabaseModel<K>>(entity: T): Promise<any> {
  return await dbRequest({
    url: `/${entity.collection}/delete-one`,
    method: 'POST',
    data: {
      query: {
        _id: entity._id,
      },
    },
  });
}
