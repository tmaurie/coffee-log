import NextAuth from "next-auth";
import { authOptions } from "@/lib/infra/auth-server";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
