export default class AppError<T> extends Error {
  public message: string;

  public statusCode: number;

  constructor(message: string, statusCode = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

