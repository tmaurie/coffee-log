import { db } from "@/lib/infra/db";
import { users } from "@/lib/infra/schema";
import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  if (!email || !username || !password) {
    return new Response("Missing fields", { status: 400 });
  }

  const normEmail = email.trim().toLowerCase();
  const normUser = username.trim().toLowerCase();

  const exists = await db
    .select({ id: users.id })
    .from(users)
    .where(or(eq(users.email, normEmail), eq(users.username, normUser)));

  if (exists.length) {
    return new Response("Email ou username déjà utilisé", { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({
    email: normEmail,
    username: normUser,
    passwordHash,
  });

  return new Response("User created", { status: 201 });
}
