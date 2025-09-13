import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import redis from "../../lib/redis";
import prisma from "@repo/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered. Please log in." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in Redis
    await redis.set(`otp:${email}`, otp, "EX", 300);

    // Send email in background (don’t block API response)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    }).catch((err) => console.error("Email send failed:", err));

    return NextResponse.json({ success: true, message: "OTP generated" });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
