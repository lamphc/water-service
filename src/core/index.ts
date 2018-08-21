import { requestType, responseFilters } from "./../http/ajax.interface";
import ConfDataBase from "./../conf/conf.interface";
import waterService, { createInstance } from "./core.main";

export { requestType, responseFilters, ConfDataBase };
export namespace WaterService {
  export const create = createInstance;
}

export default waterService;
