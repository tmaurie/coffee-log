import { machines } from "@/lib/infra/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/infra/db";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  try {
    await db.delete(machines).where(eq(machines.id, params.id));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "DELETE_FAILED" },
      { status: 500 },
    );
  }
}
