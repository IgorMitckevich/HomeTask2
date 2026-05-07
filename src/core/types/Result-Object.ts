import { FieldError } from "./ErrorsModel";
import { HttpStatus } from "../https-statuses/httpStatuses";

export type Result<T = null> = {
  status: HttpStatus;
  errorMessage?: string;
  extensions: FieldError[];
  data: T;
};
