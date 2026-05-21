import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { DomainError } from '@/errors/domain-error';

export function errorHandler(error: FastifyError, _req: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      success: false,
      error: { message: 'Validation failed', details: error.flatten().fieldErrors },
    });
  }

  if (error instanceof DomainError) {
    return reply.status(error.statusCode).send({
      success: false,
      error: { message: error.message },
    });
  }

  if (error.statusCode) {
    return reply.status(error.statusCode).send({
      success: false,
      error: { message: error.message },
    });
  }

  console.error('Unhandled error:', error);
  return reply.status(500).send({
    success: false,
    error: { message: 'Internal Server Error' },
  });
}
