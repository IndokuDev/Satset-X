import { pool } from "@/lib/db";

export async function GET(
  _req: any,
  res: any,
  params?: { id?: string }
) {
  const id = params?.id;

  if (!id) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "ID is required",
        error: {
          code: 400,
          message: "ID is required",
        },
      })
    );
    return;
  }

  try {
    const result = await pool.query(
      "SELECT id, username FROM users WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "User not found",
          error: {
            code: 404,
            message: "User not found",
          },
        })
      );
      return;
    }

    const user = result.rows[0];

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "User fetched successfully",
        user,
      })
    );
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Server error",
        error: {
          code: 500,
          message: err?.message || "Server error",
        },
      })
    );
  }
}
