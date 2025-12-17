import { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production"
);

const COOKIE_NAME = "sambad-auth-token";

export interface JWTPayload {
  userId: string;
  email: string;
  exp?: number;
}

export async function verifyTokenPages(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch {
    return null;
  }
}

export async function getSessionPages(req: NextApiRequest): Promise<JWTPayload | null> {
  const token = req.cookies[COOKIE_NAME];

  if (!token) return null;

  return verifyTokenPages(token);
}
