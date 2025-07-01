import prisma from '@/lib/db';
import { generateJWT, hashPassword } from '@/utils/auth';
import generateOTP from '@/utils/otp_generator';
import { signupSchema } from '@/utils/auth_validators';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const input = signupSchema.parse(json);
        const cookieStore = await cookies();

        // Check if user already exists
        const existing = await prisma.user.findUnique({
            where: { email: input.email },
        });

        if (existing) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 409 }
            );
        }

        // Parallel operations
        const [hashed, otp] = await Promise.all([
            hashPassword(input.password),
            generateOTP(),
        ]);

        // Transaction: create user first, then generate token, then create account
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create user
            const user = await tx.user.create({
                data: {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    password: hashed,
                    secretCode: otp,
                    agree: input.agree,
                    readGuideline: input.readGuideline,
                    role: 'USER',
                },
            });

            // 2. Generate token with user.id
            const token = generateJWT({
                userId: user.id,
                role: user.role,
            });

            // 3. Create account with token
            const account = await tx.account.create({
                data: {
                    userId: user.id,
                    accessToken: token,
                },
            });

            return { user, token, account };
        });
        console.log(result.user)
        console.log(result.account)

        // Set HttpOnly cookie
        cookieStore.set('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        return NextResponse.json(
            { success: true, message: 'Signup successful' },
            { status: 201 }
        );
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: err.flatten() }, { status: 422 });
        }

        console.error('Reset password error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
