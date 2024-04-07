import { connectMongoDB } from '@lib/mongodb';
import User from '@models/user';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs";

export async function POST(req) {
    
  try {
    const {email, password} = await req.json();
    
    await connectMongoDB();
    const user = await User.findOne({email});
    const hashedPassword = await bcrypt.hash(password, 10);
    
    
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();
    return new NextResponse("User's password is updated.", { status: 200 });
  } catch (error) {
    console.error('Error in updating password.', error);
    return new NextResponse('Something went wrong. Please try again.', { status: 500 });
  }
}
