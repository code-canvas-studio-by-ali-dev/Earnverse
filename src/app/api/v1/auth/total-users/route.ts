import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get all users from database
    const users = await prisma.user.findMany({
        include: {
            account: true,
            browserInfo: true,
            geographicLocation: true,
            loginHistory: true,
            profile: true,
            security: true,
        }
    });

    // Return success response with users data and count
    return NextResponse.json({
      success: true,
      length: users.length,
      data: users
    });

  } catch (err) {
    // Return error response if something goes wrong
    return NextResponse.json(
      { success: false, message: "Failed to fetch users", err},
      { status: 500 }
    );
  }
}