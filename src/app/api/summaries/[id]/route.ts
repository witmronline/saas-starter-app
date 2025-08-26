// src/app/api/summaries/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/postgres/postgresClient";
import { Summary } from "@/types";

// GET summary by ID
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    const client = await getPool().connect();

    try {
        const res = await client.query("SELECT * FROM summaries WHERE id = $1;", [id]);

        if (!res.rows.length) {
            return NextResponse.json({ error: "Summary not found" }, { status: 404 });
        }

        return NextResponse.json(res.rows[0]);
    } catch (err: any) {
        console.error("GET error:", err);
        return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 });
    } finally {
        client.release();
    }
}

// POST / create new summary
export async function POST(request: NextRequest) {
    const { user_id, title, content, is_public } = await request.json();

    if (!user_id) {
        return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
    }

    const client = await getPool().connect();

    try {
        const res = await client.query(
            `INSERT INTO summaries (user_id, title, content, is_public)
             VALUES ($1, $2, $3, $4)
             RETURNING *;`,
            [user_id, title || "Untitled", content || "", is_public || false]
        );

        return NextResponse.json(res.rows[0]);
    } catch (err: any) {
        console.error("POST error:", err);
        return NextResponse.json({ error: "Failed to create summary" }, { status: 500 });
    } finally {
        client.release();
    }
}

// PUT / update summary by ID (multiple fields)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    const { title, content, is_archived, is_public, deleted_at } = await request.json();

    const client = await getPool().connect();

    try {
        const fields: string[] = [];
        const values: any[] = [];
        let i = 1;

        if (title !== undefined) { fields.push(`title = $${i++}`); values.push(title); }
        if (content !== undefined) { fields.push(`content = $${i++}`); values.push(content); }
        if (is_archived !== undefined) { fields.push(`is_archived = $${i++}`); values.push(is_archived); }
        if (is_public !== undefined) { fields.push(`is_public = $${i++}`); values.push(is_public); }
        if (deleted_at !== undefined) { fields.push(`deleted_at = $${i++}`); values.push(deleted_at); }

        if (!fields.length) {
            return NextResponse.json({ error: "No fields to update" }, { status: 400 });
        }

        const query = `UPDATE summaries SET ${fields.join(", ")} WHERE id = $${i} RETURNING *;`;
        values.push(id);

        const res = await client.query(query, values);

        if (!res.rows.length) {
            return NextResponse.json({ error: "Summary not found" }, { status: 404 });
        }

        return NextResponse.json(res.rows[0]);
    } catch (err: any) {
        console.error("PUT error:", err);
        return NextResponse.json({ error: "Failed to update summary" }, { status: 500 });
    } finally {
        client.release();
    }
}

// DELETE summary by ID (soft delete optional)
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    const client = await getPool().connect();

    try {
        const res = await client.query("DELETE FROM summaries WHERE id = $1 RETURNING *;", [id]);

        if (!res.rows.length) {
            return NextResponse.json({ error: "Summary not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("DELETE error:", err);
        return NextResponse.json({ error: "Failed to delete summary" }, { status: 500 });
    } finally {
        client.release();
    }
}
