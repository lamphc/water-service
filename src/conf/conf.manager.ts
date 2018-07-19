import ConfDataBase from "./conf.interface";
export const version = "1.0.0";

export default class ConfManager {
  private ConfDataBase: ConfDataBase;

  setConfDataBase(confDataBase: ConfDataBase): ConfDataBase {
    this.ConfDataBase = confDataBase;
    return confDataBase;
  }
}
