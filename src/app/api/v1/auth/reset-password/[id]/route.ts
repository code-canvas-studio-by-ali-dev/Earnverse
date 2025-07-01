import prisma from '@/lib/db';
import { hashPassword } from '@/utils/auth';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { resetBodySchema } from '@/utils/auth_validators';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const user_id = z.string().uuid({ message: 'Invalid user ID' }).parse(id);
    const body = await req.json();
    const { newPassword } = resetBodySchema.parse(body);

    const user = await prisma.user.findUnique({ where: { id: user_id } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, message: 'Password reset successful' }, { status: 200 });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.flatten() }, { status: 422 });
    }

    console.error('Reset password error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
