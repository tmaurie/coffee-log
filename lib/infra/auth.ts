import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/infra/db";
import { users } from "@/lib/infra/schema";
import { eq, or } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email ou username", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(creds) {
        const identifier = creds?.identifier?.trim().toLowerCase() ?? "";
        const password = creds?.password ?? "";

        if (!identifier || !password) return null;

        const [user] = await db
          .select()
          .from(users)
          .where(
            or(eq(users.email, identifier), eq(users.username, identifier)),
          );

        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return { id: String(user.id), email: user.email, name: user.username };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = (user as any).id;
        token.username = (user as any).name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId as string;
        session.user.name = token.username as string;
      }
      return session;
    },
  },
};
