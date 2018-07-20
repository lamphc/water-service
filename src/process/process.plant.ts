import Pcompute from "./process.compute";

export default class Plant {
  private process: object = Pcompute;

  plugin(utils: Array<Function | any>) {
    utils.length &&
      utils.forEach(
        fn => typeof fn === "function" && (this.process[fn.name] = fn)
      );
    // console.log(this.process);
  }

  getFilter(name: string): Function {
    return this.process[name];
  }
}
