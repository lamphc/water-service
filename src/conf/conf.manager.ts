import ConfDataBase, { SchemaApi } from "./conf.interface";
import { requestType } from "../http/ajax.interface";
export const version = "1.0.0";

export default class ConfManager {
  private _Database: ConfDataBase;

  set Database(confDataBase: ConfDataBase) {
    !this._Database && (this._Database = confDataBase);
  }

  get Database(): ConfDataBase {
    return this._Database;
  }

  /**
   *
   * @param type
   */
  // getDataBaseApi(type: requestType): SchemaApi {
  //   if (!this.Database) throw new Error("DataService: No Database Config!");
  //   let config = this.Database.database[type.schema][type.api];
  //   config.url = this.Database.baseUrl + config.prefix.replace(/(\/:.+)/, "");
  //   if (type.restful) config.url += type.restful;
  //   if (config.suffix) config.url += config.suffix;
  //   type.params && (config.params = type.params);
  //   return config;
  // }

  /**
   *
   * @param api
   */
  getApi(api: requestType): SchemaApi {
    if (!this.Database) throw new Error("DataService: No Database Config!");
    let config: SchemaApi = api.api;
    config.url = this.Database.baseUrl + config.prefix.replace(/(\/:.+)/, "");
    if (api.restful) config.url += api.restful;
    if (config.suffix) config.url += config.suffix;
    api.params && (config.params = api.params);
    return config;
  }
}

// export function Pipeline() {
//   return function(target) {
//     if (target) {
//       target.prototype.pipe = new HttpPipeline();
//     }
//   };
// }
