import { Environment } from "../environment";
import { buildRequest, IInteropRequest } from "./interop.i";

export async function fetchAuth<T>(args: IInteropRequest): Promise<Partial<T>> {
  const formedUrl = `http://${Environment.AUTH_SERVICE_NAME}:${Environment.AUTH_SERIVCE_PORT}${args.endpoint}`;
  const response = await fetch(formedUrl, buildRequest(args));
  return await response.json();
}
