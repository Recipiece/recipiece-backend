import axios, { AxiosRequestConfig } from 'axios';
import { Environment } from '../environment';
import { getAuthHeader } from './util';

export async function authRequest<RequestT, ResponseT>(request: AxiosRequestConfig<RequestT>): Promise<ResponseT> {
  const fullRequest: AxiosRequestConfig<RequestT> = {
    ...request,
    url: `http://${Environment.AUTH_SERVICE_NAME}:${Environment.AUTH_SERIVCE_PORT}${request.url}`,
    headers: {
      ...(request.headers || {}),
      ...getAuthHeader(),
    },
  };
  const response = await axios.request(fullRequest);
  return response.data;
}
