import { SchemaApi } from "./../conf/conf.interface";
import InterceptorManager from "./interceptor.manager";

export const ary = [];
export interface HttpResponse {
  status: number;
  data?: object;
  msg?: string;
  headers?: object;
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
  // schema: string;
  // api: string;
  api: SchemaApi;
  params?: object;
  restful?: string;
  filters?: Array<responseFilter>;
}

export interface responseFilters {
  [filter: string]: Array<any>;
}

export interface responseFilter {
  name: string;
  arguments: Array<any>;
}
