import { SatsetResponse } from "satset-react";
import { query } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  if (!email || !username || !password) {
    return SatsetResponse.json(
      { message: "Email, username, and password are required" },
      { status: 400 }
    );
  }

  try {
    const hashed = await hashPassword(password);

    const timeoutMs = 5000;

    const timeoutPromise = new Promise((_, reject) => {
      const error: any = new Error("Database timeout");
      error.code = "DB_TIMEOUT";
      setTimeout(() => reject(error), timeoutMs);
    });

    await Promise.race([
      query(
        "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)",
        [email, username, hashed]
      ),
      timeoutPromise,
    ]);

    return SatsetResponse.json({ message: "Register success" });
  } catch (err: any) {
    if (err.code === "23505") {
      return SatsetResponse.json(
        { message: "Email or username already exists" },
        { status: 400 }
      );
    }

    if (err.code === "DB_TIMEOUT") {
      return SatsetResponse.json(
        { message: "Database timeout" },
        { status: 500 }
      );
    }

    return SatsetResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
