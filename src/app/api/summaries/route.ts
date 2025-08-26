import { NextRequest, NextResponse } from "next/server";
import { Summary } from "@/types";
import { getPool } from "@/lib/postgres/postgresClient";

export async function GET(req: NextRequest) {
  try {
    const client = await (await getPool()).connect();

    const res = await client.query("SELECT * FROM summaries ORDER BY created_at DESC;");

    const summaries: Summary[] = res.rows.map((row: any) => ({
      id: row.id,
      user_id: row.user_id,
      content: row.content,
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at ? row.updated_at.toISOString() : undefined,
      ...row
    }));

    client.release(); // return connection to pool
    return NextResponse.json(summaries, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch summaries" }, { status: 500 });
  }
}
