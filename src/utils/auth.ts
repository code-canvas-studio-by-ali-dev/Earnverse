import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";

const SALT_ROUNDS = process.env.NODE_ENV === "production" ? 12 : 6;

const CUSTOM = process.env.CUSTOM_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if (!CUSTOM || !JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new Error("❌ Missing required environment variables in auth.ts");
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain + CUSTOM, SALT_ROUNDS);
}

export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain + CUSTOM, hash);
}

export function generateJWT(payload: Record<string, unknown>): string {

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as StringValue,
  };

  return jwt.sign(payload, JWT_SECRET as Secret, options);
}

export function verifyJWT(token: string): Record<string, unknown> | null {
  try {
    return jwt.verify(token, JWT_SECRET as Secret) as Record<string, unknown>;
  } catch {
    return null;
  }
}
