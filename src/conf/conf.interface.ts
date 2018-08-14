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
  prefix: any; //前缀
  suffix?: any; //后缀
  method: string;
  url?: string;
  params?: object;
}
