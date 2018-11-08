import { AjaxBase } from "./ajax.base.abstract";
import { HttpResponse, HttpRequest } from "./ajax.interface";
import ConfManager from "../conf/conf.manager";
import ConfDataBase from "../conf/conf.interface";

export default class HttpMain extends AjaxBase {
  constructor() {
    super();
  }

  public confManager: ConfManager = new ConfManager();

  public provider(database: ConfDataBase) {
    this.confManager.Database = database;
  }

  get(url: string, params?: object, headers?: object): Promise<any> {
    return this.init({ method: this.method[0], url, params, headers });
  }

  post(url: string, params: object, headers?: object, contentType?: string): Promise<any> {
    return this.init({ method: this.method[1], url, params, headers, contentType });
  }

  adapter = (config: HttpRequest) => {
    return this.init(config).then(res => res, err => Promise.reject(err));
  };

  /**
   * HTTP
   * @param method
   * @param url
   * @param params
   * @param contentType
   */
  init(
    config: HttpRequest
  ): // method: string,
    // url: string,
    // params: any,
    // contentType?: string
    Promise<any> {
    let { method, url, params, contentType, headers } = config;
    return new Promise((resolve, reject) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();

      /**
       * get,参数是object
       */
      if (method.toLowerCase() === this.method[0] && params) {
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
      /**
       * set common header
       */
      if (headers) {
        for (const key in headers) {
          if (headers.hasOwnProperty(key)) {
            xhr.setRequestHeader(key, headers[key]);
          }
        }
      }

      /** post传输,当传FormData类型的数据时，不需要设置Content-Type
       *  默认设置'Content-Type'为'application/x-www-form-urlencoded',对数据进行序列化(form submit)
       *  如果'Content-Type'设置为'application/json'，数据直接传json字符串
       **/
      if (
        // method.toLowerCase() === this.method[1] &&
        this.isPlainObject(params)
      ) {
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

      //handler ajax event
      this.handlerEvent(xhr, resolve, reject, config);
      if (params === undefined) {
        params = null;
      }
      //ajax send
      xhr.send(params);
    });
  }

  /**
   *
   * @param xhr
   * @param resolve
   * @param reject
   */
  handlerEvent(xhr, resolve, reject, config: HttpRequest) {
    let response: HttpResponse;
    xhr.onload = () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        let res = xhr.response,
          headers = this.parseHeaders(xhr.getAllResponseHeaders());
        if (this.isJNString(res)) res = JSON.parse(res);
        response = {
          status: xhr.status,
          data: res,
          headers,
          config
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
    xhr.ontimeout = function () {
      response = {
        status: xhr.status,
        msg: "Link timeout!"
      };
      reject(response);
    };
    xhr.onerror = function () {
      response = {
        status: xhr.status,
        msg: "Network Error!"
      };
      reject(response);
      //clear
      xhr = null;
    };
    xhr.onabort = function () {
      response = {
        status: xhr.status,
        msg: "Request cancellation!"
      };
      reject(response);
    };
  }
}
