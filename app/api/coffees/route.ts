import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/infra/auth";
import { db } from "@/lib/infra/db";
import { coffees } from "@/lib/infra/schema";
import { eq } from "drizzle-orm";
import { getUserIdFromSession } from "@/lib/utils";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db
    .select()
    .from(coffees)
    .where(eq(coffees.userId, userId));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = getUserIdFromSession(session);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { name, origin, description, tags } = await req.json();
  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }
  const [coffee] = await db
    .insert(coffees)
    .values({
      name,
      origin,
      description,
      tags,
      userId,
    })
    .returning();
  return NextResponse.json(coffee, { status: 201 });
}
