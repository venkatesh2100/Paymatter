import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
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
          console.log("auth");
        if (!credentials) {
          return null;
        }
        const { login, password } = credentials;

        const user = await db.user.findFirst({
          where: {
            OR: [{ phonenumber: login }, { username: login }],
          },
        });

        if (!user) {
          return null;
        }

        const passwordValidation = await bcrypt.compare(
          password,
          user.password
        );
        if (!passwordValidation) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.username || user.phonenumber || "User",
          username: user.username || "",
          phonenumber: user.phonenumber || "",
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      session.user.name = token.name || null;
      session.user.email = token.email || null;
      return session;
    },
  },
  pages: {
    error: "/auth/error",
  },
};
