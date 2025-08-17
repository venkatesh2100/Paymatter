import { NextResponse } from "next/server";

// Same otpStore (use Redis/DB for production)
const otpStore: { [email: string]: { otp: string; expires: number } } = {};

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!otpStore[email]) {
      return NextResponse.json({ error: "No OTP found" }, { status: 400 });
    }

    const { otp: storedOtp, expires } = otpStore[email];

    if (Date.now() > expires) {
      delete otpStore[email];
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    if (storedOtp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    delete otpStore[email];
    return NextResponse.json({ success: true, message: "OTP verified" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
