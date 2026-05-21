import { DomainError } from './domain-error';

export class NotFoundError extends DomainError {
  readonly statusCode = 404;
  constructor(entity: string, id: string) {
    super(`${entity} "${id}" not found.`);
  }
}
