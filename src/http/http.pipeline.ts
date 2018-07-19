import HttpMain from "./http.main";
import { Interceptor } from "./ajax.interface";
import InterceptorManager from "./interceptor.manager";

// export function Pipeline() {
//   return function(target) {
//     if (target) {
//       target.prototype.pipe = new HttpPipeline();
//     }
//   };
// }
export default class HttpPipeline extends HttpMain {
  public interceptors: Interceptor = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };

  /**
   * stack queen for pipeline
   * @param config
   */
  request(config: any) {
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

    //出栈
    while (chain.length) {
      //next
      promise = promise.then(chain.shift(), chain.shift());
    }
    //next
    return promise;
  }
}
