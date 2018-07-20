import { Schema } from "./conf.interface";
/**
 * 数据库
 */
export default interface ConfDataBase {
  baseUrl: string;
  database: {
    [schemaName: string]: Schema;
  };
}

/**
 * 数据库实体表
 */
export interface Schema {
  [apiName: string]: SchemaApi;
}

/**
 * 数据库实体接口
 */
export interface SchemaApi {
  suffix: any;
  method: string;
  url?: string;
  params?: object;
}
