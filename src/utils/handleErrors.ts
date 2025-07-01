import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export function handleError(err: unknown) {
  if (err instanceof ZodError) {
    return {
      status: 422,
      body: {
        errors: err.errors.map((e) => ({
          [e.path.join('.') || 'unknown']: e.message,
        })),
      },
    };
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return {
        status: 409,
        body: { error: 'A user with this email already exists.' },
      };
    }
  }

  console.error('🔴 Unexpected error:', err);
  return {
    status: 500,
    body: { error: 'Internal server error. Please try again later.' },
  };
}
