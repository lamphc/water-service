export abstract class AjaxBase {
  protected method: Array<string> = ["get", "post", "put", "delete"];
  timeout: number = 5000;

  /**
   * HTTP method fn
   * @param url
   * @param params
   * @param contentType
   */
  abstract get(url: string, params: object, headers: object): Promise<any>;

  abstract post(
    url: string,
    params: object,
    headers: object,
    contentType?: string
  ): Promise<any>;

  //end

  /**
   *
   * @param obj 判断是否为纯对象，比如这种格式 {'name': 'jason'} 是纯对象，函数、数组等则不是
   */
  isPlainObject(obj: object) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }

  /**
   * Converts an object to x-www-form-urlencoded serialization.
   * @param obj
   * @return
   */
  serialize(obj: object) {
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

  ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];

  trim(str) {
    return str.replace(/^\s*/, "").replace(/\s*$/, "");
  }

  parseHeaders(headers: string) {
    var parsed = {};
    var key;
    var val;
    var i;

    if (!headers) {
      return parsed;
    }
    let rheaders = headers.split("\n");
    rheaders.forEach(line => {
      i = line.indexOf(":");
      key = this.trim(line.substr(0, i)).toLowerCase();
      val = this.trim(line.substr(i + 1));

      if (key) {
        if (parsed[key] && this.ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === "set-cookie") {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      }
    });

    return parsed;
  }

  /**
   *
   * @param str
   */
  isJNString(str: string) {
    if (typeof str == "string") {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        // console.log(e);
        return false;
      }
    }
    return false;
  }
}
