import { HttpException, HttpStatus } from "@nestjs/common";

interface DatabaseError extends Error {
  code?: string;
  response?: {
    message?: string;
  };
}

interface DatabaseErrorDetails {
  entity: string;
  operation: "create" | "update" | "delete" | "find";
  message: string;
  originalError?: DatabaseError;
}

export class DatabaseException extends HttpException {
  constructor(details: DatabaseErrorDetails) {
    const { entity, operation, message, originalError } = details;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    // Handle specific database errors
    if (originalError?.code === "23505") {
      // Postgres unique violation
      statusCode = HttpStatus.CONFLICT;
    } else if (originalError?.code === "22P02") {
      // Invalid UUID format
      statusCode = HttpStatus.BAD_REQUEST;
    } else if (originalError?.code === "23503") {
      // Foreign key violation
      statusCode = HttpStatus.BAD_REQUEST;
    }

    super(
      {
        statusCode,
        error: "Database Error",
        message: message || `Failed to ${operation} ${entity}`,
        entity,
        operation,
      },
      statusCode,
    );
  }
}
