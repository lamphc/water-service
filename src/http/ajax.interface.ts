import InterceptorManager from "./interceptor.manager";

export const ary = [];
export interface HttpResponse {
  status: number;
  data?: object;
  msg?: string;
  [propNames: string]: any;
}

export interface HttpRequest {
  url: string;
  method: string;
  params?: any;
  contentType?: string;
  [propNames: string]: any;
}

export interface Interceptor {
  request: InterceptorManager;
  response: InterceptorManager;
}

export interface requestType {
  schema: string;
  api: string;
  params?: object;
  filters?: Array<responseFilter>;
}

export interface responseFilters {
  [filter: string]: Array<any>;
}

export interface responseFilter {
  name: string;
  arguments: Array<any>;
}
