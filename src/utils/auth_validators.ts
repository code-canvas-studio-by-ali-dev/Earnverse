import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }
    ),
  agree: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms of service',
  }),
  readGuideline: z.boolean().refine(val => val === true, {
    message: 'You must agree to accept the guidelines'
  })
});

export const verifySchema = z.object({
  secretCode: z.string().min(4, { message: 'Secret code must be at least 4 characters' }),
});

export const resetBodySchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }
    ),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});


export type SignupInput = z.infer<typeof signupSchema>;
export type verifyInput = z.infer<typeof verifySchema>;
export type resetBodyInput = z.infer<typeof resetBodySchema>;
