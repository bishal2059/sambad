import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ user: null });
    }

    const profile = await db.profile.findUnique({
      where: { userId: session.userId },
      select: {
        id: true,
        userId: true,
        name: true,
        email: true,
        imageUrl: true
      }
    });

    if (!profile) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: profile });
  } catch (error) {
    console.error("[SESSION_ERROR]", error);
    return NextResponse.json({ user: null });
  }
}
