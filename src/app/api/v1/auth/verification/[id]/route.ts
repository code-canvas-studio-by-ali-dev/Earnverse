import prisma from '@/lib/db';
import { otpSchema } from '@/utils/zod/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Parse and validate the dynamic route param
        const { id } = await params;
        const user_id = z.uuid({ message: 'Invalid UUID format' }).parse(id);

        const json: { secretCode: number } = await req.json();
        const { secretCode } = otpSchema.parse(json);

        const user = await prisma.user.findUnique({
            where: { id: user_id },
            include: { account: true },
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid verification code' }, { status: 404 });
        }

        if (user.account?.isVerified) {
            return NextResponse.json({ success: false, message: 'Already verified' }, { status: 400 });
        }

        const now = new Date();
        const diffInMinutes = (now.getTime() - user.updatedAt.getTime()) / (1000 * 60);
        const timeDiff = Number(process.env.TIMEDIFF || 10); // fallback to 10 min

        if (diffInMinutes > timeDiff) {
            return NextResponse.json(
                { success: false, message: 'Verification code has expired' },
                { status: 410 }
            );
        }

        if (!user.secretCode || user.secretCode !== secretCode) {
            return NextResponse.json({ success: false, message: 'Invalid verification code' }, { status: 400 });
        }

        await prisma.$transaction(async (tx) => [
            await tx.user.update({
                where: { id },
                data: { secretCode: null },
            }),
            await tx.account.update({
                where: { userId: id },
                data: { isVerified: true },
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

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}