import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { DomainError } from '@/errors/domain-error';

export function errorHandler(error: FastifyError, _req: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ZodError) {
    const errorMsg = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return reply.status(400).send({
      success: false,
      error: `Validation failed: ${errorMsg}`,
    });
  }

  if (error instanceof DomainError) {
    return reply.status(error.statusCode).send({
      success: false,
      error: error.message,
    });
  }

  if (error.statusCode) {
    return reply.status(error.statusCode).send({
      success: false,
      error: error.message,
    });
  }

  console.error('Unhandled error:', error);
  return reply.status(500).send({
    success: false,
    error: 'Internal Server Error',
  });
}
