import { polyfill } from "es6-promise";

polyfill();
export function AnalyzeHttp() {
  return function(target) {
    if (target) {
      // target.prototype.http = new AjaxBase();
    }
  };
}

interface HttpResponse {
  status: number;
  data?: object;
  msg?: string;
}

export abstract class AjaxBase {
  private method: Array<string> = ["get", "post"];
  timeout: number = 10000;

  constructor() {}

  /**
   * HTTP method fn
   * @param url
   * @param params
   * @param contentType
   */
  get(url: string, params: object): Promise<any> {
    return this.init(this.method[0], url, params);
  }

  post(url: string, params: object, contentType?: string): Promise<any> {
    return this.init(this.method[1], url, params, contentType);
  }

  //end

  /**
   * HTTP
   * @param method
   * @param url
   * @param params
   * @param contentType
   */
  init(
    method: string,
    url: string,
    params: any,
    contentType?: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest(),
        response: HttpResponse;

      /**
       * get,参数是object,并拼接参数到url
       */
      if (method === this.method[0] && params) {
        for (let key in params) {
          if (params.hasOwnProperty(key)) {
            url += url.indexOf("?") == -1 ? "?" : "&";
            url += key + "=" + params[key];
          }
        }
      }
      //end

      /**
       * xhr open
       */
      xhr.open(method, url, true);
      //end

      /** post传输,当传FormData类型的数据时，不需要设置Content-Type
       *  默认设置'Content-Type'为'application/x-www-form-urlencoded',对数据进行序列化(form submit)
       *  如果'Content-Type'设置为'application/json'，数据直接传json字符串
       **/
      if (method === this.method[1] && this.isPlainObject(params)) {
        if (contentType === "application/x-www-form-urlencoded") {
          xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
          params = this.serialize(params);
        } else {
          xhr.setRequestHeader("Content-Type", "application/json");
          params = JSON.stringify(params);
        }
      }
      //end

      xhr.onload = function() {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          let res = JSON.parse(xhr.response);
          response = {
            status: xhr.status,
            data: res
          };
          resolve(response);
        } else {
          response = {
            status: xhr.status,
            msg: xhr.statusText
          };
          reject(response);
        }
      };

      xhr.timeout = this.timeout;
      xhr.ontimeout = function() {
        response = {
          status: xhr.status,
          msg: "Link timeout!"
        };
        reject(response);
      };
      xhr.onerror = function() {
        response = {
          status: xhr.status,
          msg: "Network Error!"
        };
        reject(response);
      };
      xhr.onabort = function() {
        response = {
          status: xhr.status,
          msg: "Request cancellation!"
        };
        reject(response);
      };

      xhr.send(method === this.method[0] ? null : params);
    });
  }

  /**
   *
   * @param obj 判断是否为纯对象，比如这种格式 {'name': 'jason'} 是纯对象，函数、数组等则不是
   */
  isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }

  /**
   * Converts an object to x-www-form-urlencoded serialization.
   * @param obj
   * @return
   */
  serialize(obj) {
    let query = "",
      name,
      value,
      fullSubName,
      subName,
      subValue,
      innerObj,
      i;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + "[" + i + "]";
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this.serialize(innerObj) + "&";
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + "[" + subName + "]";
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this.serialize(innerObj) + "&";
        }
      } else if (value !== undefined && value !== null)
        query +=
          encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  }
}
