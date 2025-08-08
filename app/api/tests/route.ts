import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { tests } from "@/lib/infra/schema";
import { db } from "@/lib/infra/db";
import { authOptions } from "@/lib/infra/auth";
import { getUserIdFromSession } from "@/lib/utils";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db.select().from(tests).where(eq(tests.userId, userId));

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();

  const inserted = await db
    .insert(tests)
    .values({
      ...body,
      userId: userId,
    })
    .returning();

  return NextResponse.json(inserted[0], { status: 201 });
}
