import { NextAuthOptions } from "next-auth";

export const sharedAuthConfig: Partial<NextAuthOptions> = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    newUser: "/auth/signup"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  }
};
