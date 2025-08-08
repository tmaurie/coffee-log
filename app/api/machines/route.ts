import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/infra/auth";
import { db } from "@/lib/infra/db";
import { machines } from "@/lib/infra/schema";
import { eq } from "drizzle-orm";
import { getUserIdFromSession } from "@/lib/utils";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db
    .select()
    .from(machines)
    .where(eq(machines.userId, userId));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { name, brand, description } = await req.json();
  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }
  const [machine] = await db
    .insert(machines)
    .values({
      name,
      brand,
      description,
      userId,
    })
    .returning();
  return NextResponse.json(machine, { status: 201 });
}
