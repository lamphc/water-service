import { version } from "../conf/conf.manager";
import Http from "../http/http";

declare let process: {
  env: {
    NODE_ENV: string;
  };
};
export namespace DataService {
  export class Index {}
  export const http = new Http();
}
