// /app/api/auth/check-username/route.ts
import { db } from "@/lib/infra/db";
import { users } from "@/lib/infra/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const u = (searchParams.get("u") || "").trim().toLowerCase();
  if (!u)
    return new Response(JSON.stringify({ available: false }), { status: 200 });

  const found = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, u));
  const available = found.length === 0;
  return new Response(JSON.stringify({ available }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
