export abstract class AjaxBase {
  protected method: Array<string> = ["get", "post"];
  timeout: number = 6000;

  /**
   * HTTP method fn
   * @param url
   * @param params
   * @param contentType
   */
  abstract get(url: string, params: object): Promise<any>;

  abstract post(
    url: string,
    params: object,
    contentType?: string
  ): Promise<any>;

  //end

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
