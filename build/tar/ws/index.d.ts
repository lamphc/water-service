// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */

/*~ You can declare types that are available via importing the module */
/**
 * 数据库
 */
interface ConfDataBase {
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

export default class waterService {
  public provider(database: ConfDataBase): void;

  get(url: string, params?: object): Promise<any>;

  post(url: string, params: object, contentType?: string);

  timeout: number;
}

/*~ If there are types, properties, or methods inside dotted names
 *~ of the module, declare them inside a 'namespace'.
 */
export namespace WaterService {
  /*~ For example, given this definition, someone could write:
     *~   import { subProp } from 'yourModule';
     *~   subProp.foo();
     *~ or
     *~   import * as yourMod from 'yourModule';
     *~   yourMod.subProp.foo();
     */
  export function create(): void;
}
