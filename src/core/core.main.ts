import Http from "../http/http";

declare let process: {
  env: {
    NODE_ENV: string;
  };
};

function createInstance() {
  return new Http();
}

const dataService = createInstance();

dataService.create = createInstance;

export default dataService;
