import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError, z } from "zod";

interface AuthReq {
    visitorId: string;
    username: string;
    firstName: string;
    lastName: string;
    uaData: object;
    ipData: object;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const userId = z.uuid({ message: "Invalid user ID" }).parse(id);
        const body: AuthReq = await req.json();

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const result = await prisma.$transaction(async (tx) => {
            const updatedUser = await tx.user.update({
                where: { id: userId },
                data: {
                    username: body.username,
                },
            });

            await tx.profile.create({
                data: {
                    userId: updatedUser.id,
                    firstName: body.firstName,
                    lastName: body.lastName,
                },
            });

            await tx.browserInfo.create({
                data: {
                    userId: updatedUser.id,
                    data: body.uaData,
                },
            });

            const geographicLocation = await tx.geographicLocation.create({
                data: {
                    userId: updatedUser.id,
                    data: body.ipData,
                },
            });
            const ip = (geographicLocation.data as { ip?: string }).ip;
            await tx.security.create({
                data: {
                    userId: updatedUser.id,
                    visitorId: body.visitorId,
                    ips: ip ? [ip] : [],
                },
            });

            return updatedUser;
        });

        const userData = await prisma.user.findUnique({
            where: { id: result.id },
            include: {
                profile: true,
                account: true,
                loginHistory: true,
                browserInfo: true,
                geographicLocation: true,
                security: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: userData,
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: treeifyError(err) }, { status: 422 });
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}