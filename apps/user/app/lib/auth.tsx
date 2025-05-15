import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface Credentials {
  phone: string;
  password: string;
}

const loginUser = async (credentials: Credentials) => {
  try {
    const existingUser = await db.user.findFirst({
      where: { phonenumber: credentials.phone }
    });

    if (!existingUser) return null;

    const isValidPassword = await bcrypt.compare(credentials.password, existingUser.password);

    if (!isValidPassword) return null;

    return {
      id: existingUser.id.toString(),
      name: existingUser.username,
      email: existingUser.phonenumber
    };
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials: any) {
        const user = await loginUser(credentials);
        if (!user) throw new Error("User not found");
        return user;
      }
    })
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.sub;
      return session;
    }
  }
};
