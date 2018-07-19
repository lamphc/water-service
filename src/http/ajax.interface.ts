import InterceptorManager from "./interceptor.manager";

export const ary = [];
export interface HttpResponse {
  status: number;
  data?: object;
  msg?: string;
}

export interface Interceptor {
  request: InterceptorManager;
  response: InterceptorManager;
}
