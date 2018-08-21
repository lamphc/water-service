import HttpMain from "./http.main";
import { Interceptor, requestType, responseFilters } from "./ajax.interface";
import InterceptorManager from "./interceptor.manager";
import Plant from "../process/process.plant";

export default class HttpPipeline extends HttpMain {
  public interceptors: Interceptor = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };

  /**
   * factory filters
   */
  public plant: Plant = new Plant();

  request(type: requestType, filters?: responseFilters): Promise<any> {
    let config = this.confManager.getApi(type);
    return this.handlerChain(config, filters);
  }

  /**
   * stack queen for pipeline
   * @param config
   */
  handlerChain(config: any, filters?: responseFilters): Promise<any> {
    //stack queen
    let chain = [this.adapter, undefined];
    let promise = Promise.resolve(config);

    //压栈
    this.interceptors.request.getIntercept(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    //进栈
    this.interceptors.response.getIntercept(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });
    //extral
    this.injectResponseFilters(chain, filters, config);

    //出栈
    while (chain.length) {
      //next
      promise = promise.then(chain.shift(), chain.shift());
    }

    //next
    return promise;
  }

  injectResponseFilters(
    chain: Array<Function>,
    filters: responseFilters,
    config: any
  ) {
    if (filters) {
      config.filters = filters;
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          chain.push(this.plant.getFilter(key), undefined);
        }
      }
    }
  }
}
