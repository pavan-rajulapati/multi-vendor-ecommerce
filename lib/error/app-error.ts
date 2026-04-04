export class AppError extends Error {
  statusCode: number;
  errorCode: string;
  isOperational: boolean;

  constructor(message: string, statusCode = 500, errorCode = "INTERNAL_ERROR", isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}