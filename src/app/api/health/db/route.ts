import { db } from "@/backend/db";

export async function GET() {
  try {
    await db.query("SELECT 1");

    return Response.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    return Response.json(
      {
        status: "error",
        database: "unavailable",
      },
      { status: 503 }
    );
  }
}