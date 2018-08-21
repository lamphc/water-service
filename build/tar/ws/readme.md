# 前言
提供统一的数据库接口配置管理.独立的管道和中间件机制,从请求开始、进行、结束各个环节的流式管道处理过程.同时支持数据加工中间件的自注入,达到理想的所要即所得的状态.

# 实例接口
默认实例:waterService

| 属性           | 说明               | 类型       | 默认值 |
| -------------- | ------------------ | ---------- | ------ |
| **`provider`** | 数据库配置         | `function` |        |
| **`timeout`**  | 超时设置           | `number`   | 5000   |
| **`use`**      | 中间件配置         | `function` |        |
| **`plugin`**   | 数据加工公共中间件 | `function` |        |
| **`request`**  | 数据请求           | `function` |        |

# 接口功能
```js
//数据库接口配置
export default interface ConfDataBase {
  baseUrl: string;
  database: {
    [schemaName: string]: Schema;
  };
}

/**
 * 数据库实体表
 */
export interface Schema {
  [apiName: string]: SchemaApi;
}

/**
 * 数据库实体接口
 */
export interface SchemaApi {
  suffix: any;
  method: string;
  url?: string;
  params?: object;
}


```
# 安装

```npm
npm i water-service
```
# 使用示例

```js
import waterService, { WaterService } from "water-service";

//多实例的创建
let ot = WaterService.create();
...

//在angular下使用示例(ng2+)-------------------------------
//创建全局service,引入water-service
//provider服务到根组件
import { Injectable } from "@angular/core";
import waterService,{ WaterService,ConfDataBase,requestType,responseFilters } from "water-service";
import { DATABASE } from "./service/config.database";

@Injectable()
export class AppService {
  confDataBase:ConfDataBase;
  api:any;
  constructor() {
    super();
    this.confDataBase = DATABASE;
    this.api = this.confDataBase.database;
    let headers = {
      "x-client-token": "Be_HkRG5IpDL5AgCeXIEDJUhciIDDfxnFZT53Xl5sU4"
    };
    //注册数据库接口配置
    waterService.provider(this.confDataBase);

    //设置请求超时时间
    waterService.timeout = 6000;

    //注册全局数据流中间件
    waterService.interceptors.request.use(conf => {
      //设置请求header头(无需设置content-type)
      conf.headers = { access_token: Math.random() * 10000 };
      return conf;
    });
    waterService.interceptors.response.use(res => {
      res.over = 1000;
      return res;
    });
  }
  
  
  //common
  //main rewrite request
  request(type:requestType,filters?: responseFilters): Promise<any>{
    return waterService
    .request(
     type,
      filters
    )
  }


}


//接口配置文件config.database.ts
  export const DATABASE = {
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


//依赖注入(业务模块调用)
import { Component, OnInit} from '@angular/core';
@Component({...})
export class DemoComponent implements OnInit{
    //注入service
    constructor(public appService:AppService){

    }
    
      ngOnInit() {
          //数据请求
          this.appService
            .request(
              { 
                api: this.appService.api.schema1.api1,
                params: { name: "test" } 
              }
            )
            .then(
              res => {
                console.log("final:", res);
              },
              err => console.log("final-err:", err)
            );
      }
}

  //end---------------------------------


    
  //其它方式---------------------------- 
  //独立请求调用  
  let conf = {
    method: "get",
    url: "http://5ab211b762a6ae001408c1d0.mockapi.io/ng/heroes"
  };
  waterService.get(conf.url).then(res => console.log("get:", res));


```