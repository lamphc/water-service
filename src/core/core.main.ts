import Http from "../http/http";

declare let process: {
  env: {
    NODE_ENV: string;
  };
};

export function createInstance() {
  return new Http();
}

const waterService = createInstance();

export default waterService;
