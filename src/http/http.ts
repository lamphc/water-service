import { polyfill } from "es6-promise";
import HttpPipeline from "./http.pipeline";

polyfill();
export default class Http extends HttpPipeline {
  constructor() {
    super();
  }
  create: Function;
}
