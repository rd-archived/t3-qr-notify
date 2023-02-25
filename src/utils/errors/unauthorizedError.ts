import HttpError from "./httpError";

export default class UnauthorizedError extends HttpError {
  constructor() {
    super(401, "Unauthorized");
  }
}
