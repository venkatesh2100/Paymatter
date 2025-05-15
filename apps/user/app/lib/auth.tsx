"use client";

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db/client";
import { sharedAuthConfig } from "./sharedAuthConfig";

// Login Configuration
const loginAuthOptions: NextAuthOptions = {
  ...sharedAuthConfig,
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        login: { label: "Username/Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          throw new Error("Username/Phone and password are required");
        }

        const user = await db.user.findFirst({
          where: {
            OR: [
              { username: credentials.login },
              { phonenumber: credentials.login }
            ]
          }
        });

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
        };
      }
    })
  ],
  pages: {
    ...sharedAuthConfig.pages,
    signIn: "/auth/login"
  }
};

// Signup Configuration
const signupAuthOptions: NextAuthOptions = {
  ...sharedAuthConfig,
  providers: [
    CredentialsProvider({
      name: "Signup",
      credentials: {
        username: { label: "Username", type: "text" },
        phonenumber: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.phonenumber || !credentials?.password) {
          throw new Error("All fields are required");
        }

        const existingUser = await db.user.findFirst({
          where: {
            OR: [
              { username: credentials.username },
              { phonenumber: credentials.phonenumber }
            ]
          }
        });

        if (existingUser) throw new Error("Username or phone already exists");

        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const newUser = await db.user.create({
          data: {
            username: credentials.username,
            phonenumber: credentials.phonenumber,
            password: hashedPassword,
          }
        });

        return {
          id: newUser.id.toString(),
          username: newUser.username,
        };
      }
    })
  ],
  pages: {
    ...sharedAuthConfig.pages,
    signIn: "/auth/signup"
  }
};

// Exporting both configurations for use in the `[...nextauth].ts` route
export { loginAuthOptions, signupAuthOptions };
