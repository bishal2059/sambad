import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { verifyPassword, createToken, COOKIE_NAME } from "@/lib/auth";

type LoginBody = { email: string; password: string };
function isLoginBody(x: unknown): x is LoginBody {
  if (!x || typeof x !== "object") return false;
  const b = x as Record<string, unknown>;
  return typeof b.email === "string" && typeof b.password === "string";
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    if (!isLoginBody(body)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email (select needed fields incl. password)
    const profile = await db.profile.findFirst({
      where: { email },
      select: {
        id: true,
        userId: true,
        name: true,
        email: true,
        imageUrl: true,
        password: true
      }
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, profile.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken({
      userId: profile.userId,
      email: profile.email
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: profile.id,
        userId: profile.userId,
        name: profile.name,
        email: profile.email,
        imageUrl: profile.imageUrl
      }
    });

    // Set auth cookie using NextResponse cookies API
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
