import { DataService } from "./core";
export default DataService;

//test
(function(w, undefined) {
  w["DataService"] = DataService;

  const database = {
    baseUrl: "http://5990367be1e4470011c46fa8.mockapi.io",
    database: {
      schema1: {
        api1: {
          suffix: "/meng/user",
          method: "get"
        },
        api2: {
          suffix: "/meng/user",
          method: "post"
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

  //注册数据接口配置
  DataService.http.confManager.setConfDataBase(database);
  //设置请求超时时间
  DataService.http.timeout = 7000;

  //注册数据流中间件
  DataService.http.interceptors.request.use(conf => {
    conf.headers = { access_token: Math.random() * 10000 };
    return conf;
  });
  DataService.http.interceptors.response.use(res => {
    res.over = 1000;
    return res;
  });

  //注入filters
  DataService.http.plant.plugin([
    function sort(res) {
      console.log("res-filters:", res);
      let args = res.config.filters["sort"];
      res.data = res.data.sort((a, b) => b[args[0]] - a[args[0]]);
      return res;
    }
  ]);

  //data run
  DataService.http
    .request(
      { schema: "schema1", api: "api1", params: { name: "test" } },
      {
        sort: ["sort", -1]
      }
    )
    .then(
      res => {
        console.log("final:", res);
      },
      err => console.log("final-err:", err)
    );
  let conf = {
    method: "get",
    url: "http://5ab211b762a6ae001408c1d0.mockapi.io/ng/heroes"
  };
  DataService.http.get(conf.url).then(res => console.log("get:", res));
})(window);
//end
