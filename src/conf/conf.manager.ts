import ConfDataBase, { SchemaApi } from "./conf.interface";
import { requestType } from "../http/ajax.interface";
export const version = "1.0.0";

export default class ConfManager {
  private ConfDataBase: ConfDataBase;

  setConfDataBase(confDataBase: ConfDataBase): ConfDataBase {
    this.ConfDataBase = confDataBase;
    return confDataBase;
  }

  getConfDataBase(): ConfDataBase {
    return this.ConfDataBase;
  }

  /**
   *
   * @param type
   */
  getConfDataBaseApi(type: requestType): SchemaApi {
    if (!this.ConfDataBase) throw new Error("DataService: No Database Config!");
    let config = this.ConfDataBase.database[type.schema][type.api];
    config.url = this.ConfDataBase.baseUrl + config.suffix;
    type.params && (config.params = type.params);
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
