import { nou } from "../utils";

export interface IInteropRequest {
  endpoint: string;
  requestData?: RequestInit;
  authToken?: string;
}


export function buildRequest(interop: IInteropRequest): RequestInit {
  const headers = {
    ...(interop.requestData?.headers),
    'Content-Type': 'application/json',
  };

  if(!nou(interop.authToken)) {
    // @ts-ignore
    headers['Authorization'] = `Bearer ${interop.authToken}`;
  }

  return {
    ...(interop.requestData || {}),
    headers
  }
}
