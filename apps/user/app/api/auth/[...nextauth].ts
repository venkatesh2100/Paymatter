import { loginAuthOptions } from "../../lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(loginAuthOptions);
export { handler as GET, handler as POST };