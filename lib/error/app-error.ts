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

	static NotFound(resource = "Resource") {
		return new AppError(`${resource} not found`, 404, "NOT_FOUND");
	}

	static Unauthorized(message = "Unauthorized access") {
		return new AppError(message, 401, "UNAUTHORIZED");
	}

	static Forbidden(message = "You do not have permission to perform this action") {
		return new AppError(message, 403, "FORBIDDEN");
	}

	static BadRequest(message = "Invalid input data") {
		return new AppError(message, 400, "BAD_REQUEST");
	}

	static Conflict(message = "Resource already exists") {
		return new AppError(message, 409, "CONFLICT");
	}
}