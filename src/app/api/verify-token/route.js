import { connectMongoDB } from '@lib/mongodb';
import User from '@models/user';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  const { token } = await req.json();

  try {
    await connectMongoDB();

    // Hash the token to compare with the stored hash in the database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find the user with the matching hashed reset token
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return new NextResponse('Invalid Token or Token has expired.', { status: 400 });
    }

    // Respond with user data or success message
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error in verifying token:', error);
    return new NextResponse('Something went wrong. Please try again.', { status: 500 });
  }
}
