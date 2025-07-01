import prisma from '@/lib/db';
import { verifySchema } from '@/utils/auth_validators';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // ✅ Parse and validate the dynamic route param
        const { id } = await params
        const user_id = z.string().uuid({ message: 'Invalid UUID format' }).parse(id);

        const json = await req.json();
        const { secretCode } = verifySchema.parse(json);

        const user = await prisma.user.findUnique({
            where: { id: user_id },
            include: { accounts: true },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (!user.secretCode || user.secretCode !== secretCode) {
            return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
        }

        const now = new Date();
        const diffInMinutes = (now.getTime() - user.updatedAt.getTime()) / (1000 * 60);
        const timeDiff = Number(process.env.TIMEDIFF || 10); // fallback to 10 min

        if (diffInMinutes > timeDiff) {
            return NextResponse.json(
                { error: 'Verification code has expired' },
                { status: 410 }
            );
        }

        await prisma.$transaction([
            prisma.user.update({
                where: { id },
                data: { secretCode: null },
            }),
            prisma.account.updateMany({
                where: { userId: id },
                data: { userVerified: true },
            }),
        ]);

        return NextResponse.json(
            { success: true, message: 'User verified successfully' },
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
