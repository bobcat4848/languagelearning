import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("User does not exist", { status: 400 });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = Date.now() + 3600000;

    // Update user document with reset token and expiry
    user.resetToken = passwordResetToken;
    user.resetTokenExpires = passwordResetExpires;
    await user.save();

    // Create nodemailer transporter with SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // Compose email message
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset Request",
      text: `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetUrl}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Send password reset email
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.response);

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("Password reset error:", error);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    return new NextResponse("Error", { status: 500 });
  }
}
