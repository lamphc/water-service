import waterService, { WaterService } from "water-service";
// import waterService, { WaterService } from "../src";

//多实例的创建
let ot = WaterService.create();
console.log("====================================");
console.log(WaterService);
console.log("====================================");

//单例调用
run(waterService);
function run(waterService) {
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

  //注册数据库接口配置
  waterService.provider(database);

  //设置请求超时时间
  waterService.timeout = 6000;

  //注册全局数据流中间件
  waterService.interceptors.request.use(conf => {
    conf.headers = { access_token: Math.random() * 10000 };
    return conf;
  });
  waterService.interceptors.response.use(res => {
    res.over = 1000;
    return res;
  });

  //注入数据加工filters
  waterService.plant.plugin([
    function sort(res) {
      console.log("res-filters:", res);
      let args = res.config.filters["sort"];
      res.data = res.data.sort((a, b) => b[args[0]] - a[args[0]]);
      return res;
    }
  ]);

  //数据请求
  waterService
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

  //独立请求调用
  let conf = {
    method: "get",
    url: "http://5ab211b762a6ae001408c1d0.mockapi.io/ng/heroes"
  };
  waterService.get(conf.url).then(res => console.log("get:", res));
}

export default run;