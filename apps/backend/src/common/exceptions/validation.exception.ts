import { HttpException, HttpStatus } from "@nestjs/common";

interface ValidationErrorDetails {
  message: string;
  field?: string;
  value?: unknown;
}

export class ValidationException extends HttpException {
  constructor(details: ValidationErrorDetails | ValidationErrorDetails[]) {
    const errors = Array.isArray(details) ? details : [details];

    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: "Validation Error",
        details: errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
