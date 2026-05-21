import { DomainError } from './domain-error';

export class ValidationError extends DomainError {
  readonly statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}
