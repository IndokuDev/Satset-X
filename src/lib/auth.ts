import jwt from "jsonwebtoken";
import crypto from "crypto";

declare const process: {
  env: Record<string, string | undefined>;
};

const SECRET = process.env.JWT_SECRET || "satset-dev-secret";
const PASSWORD_SALT = process.env.PASSWORD_SALT || "satset-dev-salt";

export function hashPassword(password: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, PASSWORD_SALT, 64, (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(derivedKey.toString("hex"));
    });
  });
}

export async function comparePassword(password: string, hash: string) {
  const hashed = await hashPassword(password);
  const a = Buffer.from(hashed, "hex");
  const b = Buffer.from(hash, "hex");

  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

export function signToken(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
