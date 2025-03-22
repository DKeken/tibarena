import { HttpException, HttpStatus } from "@nestjs/common";

interface EntityNotFoundDetails {
  entity: string;
  identifier?: {
    field: string;
    value: unknown;
  };
}

export class EntityNotFoundException extends HttpException {
  constructor(details: EntityNotFoundDetails) {
    const { entity, identifier } = details;

    let message = `${entity} not found`;
    if (identifier) {
      message = `${entity} with ${identifier.field} '${identifier.value}' not found`;
    }

    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        error: "Not Found",
        message,
        entity,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
