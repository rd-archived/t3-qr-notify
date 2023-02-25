import { ZodError } from "zod";
import HttpError from "./httpError";

export default class ValidationError extends HttpError {
  constructor(errors: unknown) {
    if (errors instanceof ZodError) {
      super(400, "Bad Request", errors.flatten().fieldErrors);
    } else {
      super(400, "Bad Request");
    }
  }
}
