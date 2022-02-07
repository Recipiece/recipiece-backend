import axios, { AxiosRequestConfig } from 'axios';
import { Environment } from '../environment';
import { getAuthHeader } from './util';

export async function emailRequest<RequestT, ResponseT>(request: AxiosRequestConfig<RequestT>): Promise<ResponseT> {
  const fullRequest: AxiosRequestConfig<RequestT> = {
    ...request,
    url: `http://${Environment.EMAIL_SERVICE_NAME}:${Environment.EMAIL_SERVICE_PORT}${request.url}`,
    headers: {
      ...(request.headers || {}),
      ...getAuthHeader(),
    },
  };
  const response = await axios.request(fullRequest);
  return response.data;
}

export async function sendCreateAccountEmail(to: string, token: string): Promise<any> {
  return await emailRequest({
    data: {
      to: to,
      data: { token },
    },
    url: '/send/signup',
    method: 'POST',
  });
}

export async function sendForgotPasswordEmail(to: string, token: string): Promise<any> {
  return await emailRequest({
    data: {
      to: to,
      data: { token },
    },
    url: '/send/forgot-password',
    method: 'POST',
  });
}

export async function sendSharedShoppingListEmail(to: string, listId: string, ownerEmail: string): Promise<any> {
  return await emailRequest({
    data: {
      to: to,
      data: {
        list: listId,
        owner: ownerEmail,
      },
    },
    url: '/send/shared-shopping-list',
    method: 'POST',
  });
}

