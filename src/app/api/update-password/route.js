import { connectMongoDB } from '@lib/mongodb';
import { NextResponse } from 'next/server';
import User from "@models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    await connectMongoDB();

    // Parse the request body to get email and newPassword
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json({ message: 'Email or newPassword missing in request body' }, { status: 400 });
    }

    console.log('Email:', email);
    console.log('New Password:', newPassword);

    if (typeof newPassword !== 'string') {
      return NextResponse.json({ message: 'New password must be a string' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Find and update user's password in the database
    const user = await User.findOneAndUpdate({ email: email }, { password: hashedPassword });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json({ message: 'Failed to update password' }, { status: 500 });
  }
}
