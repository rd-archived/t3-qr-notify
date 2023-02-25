export default class HttpError extends Error {
  code: number;
  error: unknown;

  constructor(code = 500, message = "Internal Server Error", errors?: unknown) {
    super(message);
    this.error = errors ?? message;
    this.code = code;
  }
}
