import { ary } from "./ajax.interface";
import HttpPipeline from "./http.pipeline";

export default class InterceptorManager {
  private interceptors: Array<object> = [];

  /**
   * Promise handlers push | 拦截器注入
   * @param fulfilled
   * @param rejected
   */
  use(fulfilled: Function, rejected?: Function): number {
    ary.push.call(this.interceptors, {
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.interceptors.length - 1;
  }

  /**
   * Delete handler by id
   * @param id
   */
  eject(id: number) {
    this.interceptors[id] && (this.interceptors[id] = null);
  }

  getIntercept(fn: Function) {
    this.interceptors.forEach(item => fn(item));
  }
}
