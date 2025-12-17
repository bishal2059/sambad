import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { hashPassword, createToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.profile.findFirst({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const userId = uuidv4();

    const profile = await db.profile.create({
      data: {
        userId,
        name,
        email,
        password: hashedPassword,
        imageUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
      }
    });

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

    // Set auth cookie
    response.headers.set("Set-Cookie", setAuthCookie(token));

    return response;
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
