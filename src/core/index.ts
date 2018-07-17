import { version } from "../conf/conf";
import { polyfill } from "es6-promise";

polyfill();

declare let process: {
  env: {
    NODE_ENV: string;
  };
};
export namespace Meng {
  export class Index {
    constructor() {
      this.test();
    }

    ts: string = version;
    test() {
      const v = `DataService-${this.ts}`;
      console.log("====================================");
      console.log(v, process.env.NODE_ENV);
      console.log("====================================");

      let b = document.createElement("div");
      b.style.cssText = "text-align:center";
      b.innerText = v;
      document.body.appendChild(b);

      let m = new Promise((resolve, reject) => {
        resolve(1);
      });
    }
  }
}
