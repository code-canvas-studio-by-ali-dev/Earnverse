import prisma from '@/lib/db';
import generateOTP from '@/utils/opt_generator';
import { UUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: NextRequest) {
    try {
        const { id }: { id: UUID } = await req.json()
        const user_id = z.uuid({ message: 'Invalid UUID format' }).parse(id);

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { id: user_id } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Generate new secret code (OTP)
        const newSecretCode = generateOTP();

        // Update DB
        await prisma.user.update({
            where: { id },
            data: {
                secretCode: Number(newSecretCode),
            },
        });

        // You might send this via email/SMS in production
        return NextResponse.json(
            {
                success: true,
                message: 'OTP has been sent to your email.',
                code: newSecretCode
            },
            { status: 200 }
        );
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: err.flatten() }, { status: 422 });
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}