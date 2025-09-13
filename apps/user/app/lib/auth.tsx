// lib/auth.ts
import prisma from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { AuthOptions, User } from "next-auth";
import { DefaultSession } from "next-auth";

// Extend User type to include custom properties
declare module "next-auth" {
  interface User {
    id: string;
    username?: string;
    phonenumber?: string;
    email?: string;
  }

  interface Session {
    user: {
      id?: string;
      username?: string;
      phonenumber?: string;
      email?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    phonenumber?: string;
    email?: string;
    account?: string;
  }
}

// Auth options
export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "secret",

  // 🔹 Providers
  providers: [
    // Credentials Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Username or Email", type: "text", placeholder: "Enter your phone number or email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { login, password } = credentials;

        try {
          const user = await prisma.user.findFirst({
            where: { OR: [{ username: login }, { email: login }] },
          });

          if (!user) return null;

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) return null;

          return {
            id: user.id.toString(),
            username: user.username || "",
            phonenumber: user.phonenumber || "",
            email: user.email || "",
          } as User;
        } catch (err) {
          console.error("Authorization error:", err);
          return null;
        }
      },
    }),

    // Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // 🔹 Custom pages
  pages: {
    signIn: "/secure/signin",
    error: "/secure/error",
  },

  // 🔹 Callbacks
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) return false;

        const userExists = await prisma.user.findUnique({ where: { email: profile.email } });
        return !!userExists;
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
      // Handle both credentials and Google login
      if (user) {
        // For credentials login, user data is already available from authorize()
        if (account?.provider === "credentials") {
          token.id = user.id;
          token.username = user.username;
          token.phonenumber = user.phonenumber;
          token.email = user.email;
        }

        // For Google login, fetch user from database
        if (account?.provider === "google" && profile?.email) {
          const dbUser = await prisma.user.findUnique({ where: { email: profile.email } });
          if (dbUser) {
            token.id = dbUser.id.toString();
            token.username = dbUser.username;
            token.phonenumber = dbUser.phonenumber;
            token.email = dbUser.email || "";
          }
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        username: token.username,
        phonenumber: token.phonenumber,
        email: token.email,
      };
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/dashboard`;
    }
  },
};
