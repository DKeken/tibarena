import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { DatabaseException, EntityNotFoundException } from "../exceptions";

type EntityOperation = "create" | "update" | "delete" | "find";

/**
 * Higher-order function that creates an operator to handle database errors in RxJS streams
 */
export function handleDatabaseError(
  operation: EntityOperation,
  entity: string,
) {
  return <T>(source: Observable<T>): Observable<T> => {
    return source.pipe(
      catchError((error) => {
        // Handle entity not found errors
        if (error?.status === 404 || error?.message?.includes("not found")) {
          return throwError(() => new EntityNotFoundException({ entity }));
        }

        // Parse error message from database
        let errorMessage = `Failed to ${operation} ${entity}`;
        if (error?.message) {
          errorMessage = error.message;
        } else if (error?.response?.message) {
          errorMessage = error.response.message;
        }

        // Create database exception with proper context
        return throwError(
          () =>
            new DatabaseException({
              entity,
              operation,
              message: errorMessage,
              originalError: error,
            }),
        );
      }),
    );
  };
}
