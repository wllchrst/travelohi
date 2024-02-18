import Paths from "../enums/api-paths";

export interface IEndpoint {
  url: string | Paths;
  method: Method;
}
