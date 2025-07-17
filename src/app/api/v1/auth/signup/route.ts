import prisma from "@/lib/db";
import { generateJWT, hashPassword } from "@/utils/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { signupSchema } from "@/utils/zod/auth";

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
                { success: false, message: "Please log in or reset your password" },
                { status: 409 }
            );
        }

        // Transaction: create user first
        const result = await prisma.$transaction(async (tx) => {
            // hash password
            const hashed = await hashPassword(input.password);

            // Create user
            const user = await tx.user.create({
                data: {
                    email: input.email,
                    password: hashed,
                    secretCode: input.secretCode,
                    role: "USER",
                },
            });

            // Generate token with user.id
            const token = generateJWT({ userId: user.id });

            // create account
            await tx.account.create({
                data: {
                    userId: user.id,
                    terms: input.agreeTerms,
                    guidelines: input.agreeGuidelines,
                    isActive: true,
                    accessToken: token,
                },
            });

            return { user, token };
        });

        // Set HttpOnly cookie
        cookieStore.set("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        const user = await prisma.user.findUnique({
            where: { id: result.user.id },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return NextResponse.json(
            { success: true, message: "Signup successful", data: { user, token: result.token } },
            { status: 201 }     
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