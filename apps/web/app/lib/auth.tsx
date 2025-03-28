import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phonenumber: {
          label: "Phone Number",
          type: "text",
          placeholder: "989811",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          if (!credentials?.phonenumber || !credentials?.password) {
            throw new Error("Missing phone number or password");
          }

          let user = await db.User.findFirst({
            where: {
              Phonenumber: credentials.phonenumber,
            },
          });

          if (user) {
            // If user exists, validate password
            const passwordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!passwordValid) {
              throw new Error("Invalid password");
            }
          } else {
            // If user doesn't exist, create a new one
            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            user = await db.User.create({
              data: {
                Phonenumber: credentials.phonenumber,
                password: hashedPassword,
              },
            });
          }

          return {
            id: user.id.toString(),
            name: user.username?.toString() || "New User",
            email: user.email?.toString() || "",
            phonenumber: user.phonenumber.toString(),
          };
        } catch (error: any) {
          console.error("Authentication error:", error.message);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
