import { SatsetResponse, cookies } from "satset-react";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

function getUserIdFromCookies() {
  const store = cookies();
  const tokenCookie = store.get("token");
  if (!tokenCookie?.value) return null;

  try {
    const decoded: any = verifyToken(tokenCookie.value);
    return decoded && decoded.uid ? String(decoded.uid) : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const uid = getUserIdFromCookies();
  if (!uid) {
    return SatsetResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const result = await query(
      "SELECT id, message, created_at FROM chats WHERE user_id = $1 ORDER BY created_at DESC",
      [uid]
    );

    return SatsetResponse.json({
      message: "Chats fetched",
      chats: result.rows,
    });
  } catch (error: any) {
    return SatsetResponse.json(
      {
        message: "Failed to fetch chats",
        error: {
          code: 500,
          message: error?.message || "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const uid = getUserIdFromCookies();
  if (!uid) {
    return SatsetResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { message } = await req.json();
  if (!message) {
    return SatsetResponse.json(
      { message: "Message is required" },
      { status: 400 }
    );
  }

  try {
    const result = await query(
      "INSERT INTO chats (user_id, message) VALUES ($1, $2) RETURNING id, message, created_at",
      [uid, message]
    );

    return SatsetResponse.json({
      message: "Chat created",
      chat: result.rows[0],
    });
  } catch (error: any) {
    return SatsetResponse.json(
      {
        message: "Failed to create chat",
        error: {
          code: 500,
          message: error?.message || "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}

