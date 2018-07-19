import Http from "./http/http";
import { DataService } from "./core";

export default DataService;
export { Http };

//test
(function(w, undefined) {
  w["DataService"] = DataService;

  const database = {
    baseUrl: "http://wwww.baidu.com",
    database: {
      schema1: {
        api1: {
          suffix: "/smart",
          method: "get"
        },
        api2: {
          suffix: "/smart",
          method: "get"
        }
      },
      schema2: {
        api1: {
          suffix: "/smart",
          method: "get"
        },
        api2: {
          suffix: "/smart",
          method: "post"
        }
      }
    }
  };
  let conf = {
    method: "get",
    url: "http://5ab211b762a6ae001408c1d0.mockapi.io/ng/heroes",
    headers: { access_token: Math.random() * 10000 }
  };

  //注册数据接口配置
  DataService.http.confManager.setConfDataBase(database);
  //设置请求超时时间

  DataService.http.timeout = 7000;

  //注册数据流中间件
  DataService.http.interceptors.request.use(conf => {
    conf.start = 100;
    return conf;
  });
  DataService.http.interceptors.response.use(res => {
    res.over = 1000;
    return res;
  });

  //data run
  DataService.http.request(conf).then(
    res => {
      console.log("final:", res);
    },
    err => console.log("final-err:", err)
  );

  DataService.http.get(conf.url).then(res => console.log("get:", res));
})(window);
//end
