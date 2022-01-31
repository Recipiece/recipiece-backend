import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { nou } from '../utils';
import { Environment } from '../environment';
import { getAuthHeader } from './util';

export async function memcacheRequest<RequestT>(request: AxiosRequestConfig<RequestT>): Promise<AxiosResponse<any>> {
  const fullRequest: AxiosRequestConfig<RequestT> = {
    ...request,
    url: `http://${Environment.MEMCACHE_SERVICE_NAME}:${Environment.MEMCACHE_PORT}${request.url}`,
    headers: {
      ...(request.headers || {}),
      ...getAuthHeader(),
    },
  };
  return await axios.request(fullRequest);
}

export async function memSet(key: string, value: any, ttl?: number) {
  const requestData: any = {
    data: value,
  };
  if(!nou(ttl)) {
    requestData.ttl = ttl;
  }
  await memcacheRequest({
    url: `/${key}`,
    data: requestData,
    method: 'POST',
  });
}

export async function memHas(key: string): Promise<boolean> {
  const response = await memcacheRequest({
    url: `/has/${key}`,
    method: 'GET',
  });
  return response.status === 200;
}

export async function memDel(key: string) {
  await memcacheRequest({
    url: `/${key}`,
    method: 'DELETE',
  });
}

export async function memGet<T>(key: string): Promise<T> {
  const response = await memcacheRequest({
    url: `/${key}`,
    method: 'GET',
  });
  return response.data;
}
