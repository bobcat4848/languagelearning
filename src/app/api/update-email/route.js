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

    const { email, newEmail } = await req.json();

    if (!email || !newEmail) {
      return NextResponse.json({ message: 'Email or newEmail missing in request body' }, { status: 400 });
    }

    // Find and update user's password in the database
    const user = await User.findOneAndUpdate({ email: email }, { email: newEmail }, {returnOriginal: false});
    

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Email updated successfully' });
  } catch (error) {
    console.error('Email update error:', error);
    return NextResponse.json({ message: 'Failed to update email' }, { status: 500 });
  }
}
