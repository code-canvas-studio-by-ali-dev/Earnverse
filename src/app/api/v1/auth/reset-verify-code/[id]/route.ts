import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import generateOTP from '@/utils/otp_generator';

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
    try {

        const { id } = await params
        const user_id = z.string().uuid({ message: 'Invalid UUID format' }).parse(id);

        // ✅ Check if user exists
        const user = await prisma.user.findUnique({ where: { id: user_id } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // ✅ Generate new secret code (OTP)
        const newSecretCode = generateOTP(); // e.g. 9-digit string

        // ✅ Update DB
        await prisma.user.update({
            where: { id },
            data: {
                secretCode: newSecretCode,
            },
        });

        // 📨 You might send this via email/SMS in production
        return NextResponse.json(
            {
                success: true,
                message: 'Verification code reset successfully',
            },
            { status: 200 }
        );
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: err.flatten() }, { status: 422 });
        }

        console.error('Reset password error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
