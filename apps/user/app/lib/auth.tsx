// lib/auth.ts
import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
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
      async authorize(credentials: any) {
        // console.log("🔐 Authorize called with credentials:", credentials);

        if (!credentials) {
          // console.error("❌ No credentials provided");
          return null;
        }

        const { login, password } = credentials;

        try {
          const user = await db.user.findFirst({
            where: {
              OR: [{ phonenumber: login }, { username: login }],
            },
          });

          if (!user) {
            // console.warn("⚠️ No user found for:", login);
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            // console.warn("⚠️ Invalid password for user:", login);
            return null;
          }

          // console.log("✅ User authenticated:", user.username || user.phonenumber);

          return {
            id: user.id.toString(),
            username: user.username || "",
            phonenumber: user.phonenumber || "",
          };
        } catch (error) {
          console.error("🔥 Error during authorization:", error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.JWT_SECRET || "secret",

  pages: {
    error: "/secure/error",
  },

  callbacks: {
    async jwt({ token, user }) {
      // console.log("🔄 JWT callback - token before:", token, "user:", user);
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.phonenumber = user.phonenumber;
      }
      // console.log("🔄 JWT callback - token after:", token);
      return token;
    },

    async session({ session, token }) {
      // console.log("🪪 Session callback - token:", token);
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          username: token.username,
          phonenumber: token.phonenumber,
        };
      }
      // console.log("🪪 Session callback - session after:", session);
      return session;
    },
  },
};
