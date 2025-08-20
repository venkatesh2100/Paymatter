// lib/auth.ts
import prisma from "@repo/db";
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

export const authOptions: AuthOptions = {
  providers: [
    // 🔹 Credentials Login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: {
          label: "username or email",
          type: "text",
          placeholder: "Enter your phone number or email",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { login, password } = credentials;

        try {
          const user = await prisma.user.findFirst({
            where: {
              OR: [{ username: login }, { email: login }],
            },
          });

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return null;

          return {
            id: user.id.toString(),
            username: user.username || "",
            phonenumber: user.phonenumber || "",
            email: user.email || "",
          } as User;
        } catch (error) {
          console.error("🔥 Error during authorization:", error);
          return null;
        }
      },
    }),

    // 🔹 Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.JWT_SECRET || "secret",

  pages: {
    error: "/secure/error",
    signIn: "/secure/signin",
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const email = profile?.email;
        if (!email) return false;

        let existingUser = await prisma.user.findUnique({ where: { email } });

        if (!existingUser) {
          // ✅ Auto-create user in DB on first Google login
          existingUser = await prisma.user.create({
            data: {
              email,
              username: profile?.name ?? email.split("@")[0],
              phonenumber: "", // optional, can be updated later
              password: "", // not used for Google accounts
            },
          });
        }
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
      // 🔹 Handle Google login mapping
      if (account?.provider === "google" && profile?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (dbUser) {
          token.id = dbUser.id.toString(); // ✅ Always DB ID
          token.username = dbUser.username;
          token.phonenumber = dbUser.phonenumber;
          token.email = dbUser.email;
        }
      }

      // 🔹 Handle credentials login mapping
      if (user) {
        const customUser = user as User & {
          id?: string | number;
          username?: string;
          phonenumber?: string;
          email?: string;
        };

        token.account = account?.provider || "";
        token.id = customUser.id?.toString() ?? token.id;
        token.username = customUser.username ?? token.username;
        token.phonenumber = customUser.phonenumber ?? token.phonenumber;
        token.email = customUser.email ?? token.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id, // ✅ Always DB id now
        username: token.username,
        phonenumber: token.phonenumber,
        email: token.email,
      };
      return session;
    },

    async redirect() {
      return "/dashboard";
    },
  },
};
