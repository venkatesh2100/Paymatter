// lib/auth.ts
import db from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { AuthOptions, User } from "next-auth";

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      username?: string;
      phonenumber?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    phonenumber?: string;
    account?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    // Credentials Login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: {
          label: "Phone or Username",
          type: "text",
          placeholder: "Enter your phone number or username",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { login, password } = credentials;

        try {
          const user = await db.user.findFirst({
            where: {
              OR: [{ phonenumber: login }, { username: login }],
            },
          });

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return null;

          return {
            id: user.id.toString(),
            username: user.username || "",
            phonenumber: user.phonenumber || "",
          } as User;
        } catch (error) {
          console.error("🔥 Error during authorization:", error);
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

  secret: process.env.JWT_SECRET || "secret",

  pages: {
    error: "/secure/error",
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        // Cast user to your custom type
        const customUser = user as User & {
          id?: string;
          username?: string;
          phonenumber?: string;
        };

        token.account = account?.provider || "";
        token.id = customUser.id ?? profile?.sub;
        token.username = customUser.username ?? profile?.name;
        token.phonenumber = customUser.phonenumber ?? undefined;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          username: token.username,
          phonenumber: token.phonenumber,
        };
      }
      return session;
    },
  },
};
