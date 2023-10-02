import httpStatusCode from "../utils/httpStatusCode";

const { StatusCode, ReasonPhrases } = httpStatusCode;

class ErrorResponse extends Error {
  private status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.FORBIDDEN,
    statusCode = StatusCode.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.CONFLICT,
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}

// Others class errors

export { ConflictRequestError, BadRequestError };
