import prisma from "@/lib/db";
import { generateJWT, verifyPassword } from "@/utils/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { loginSchema } from "@/utils/zod/auth";

export async function POST(req: Request) {
    try {
        // Parse and validate input data
        const input = loginSchema.parse(await req.json());
        const cookieStore = await cookies();

        // Fetch user and update account in a single transaction
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { username: input.username },
            });

            if (!user) {
                return { success: false, error: "Please log in or reset your password", status: 409 };
            }

            // Update account with isActive and accessToken
            await tx.account.update({
                where: { userId: user.id },
                data: { isActive: true },
            });

            const isPasswordValid = await verifyPassword(input.password, user.password);
            if (!isPasswordValid) {
                return { success: false, error: "Please log in or reset your password", status: 409 };
            }

            // Generate and save JWT token
            const token = generateJWT({ userId: user.id });
            await tx.account.update({
                where: { userId: user.id },
                data: { accessToken: token },
            });

            // Fetch user data with selected fields
            const userData = await tx.user.findUnique({
                where: { id: user.id },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });

            return { success: true, message: "login successful", data: userData, token, status: 200 };
        });

        if (!result.success) {
            return NextResponse.json({ success: false, message: result.message }, { status: result.status });
        }

        // Set HttpOnly cookie
        cookieStore.set("token", result.token!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return NextResponse.json(
            { success: true, message: "login successful", data: result.data },
            { status: 200 }
        );
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: z.treeifyError(err) }, { status: 422 });
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}