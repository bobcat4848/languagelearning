import { connectMongoDB } from "@lib/mongodb";
import Progress from "@models/progress";
import User from '@models/user';
import { NextResponse } from "next/server";

async function findUserAndUseId(email) {
    const user = await User.findOne({ email: email });

    if (!user) {
        console.log('User not found');
        return;
    }

    // Access the user's ID
    const userId = user._id;

    console.log('User ID:', userId);

    // Now you can use `userId` for your needs, like associating progress or any other operation
}

const calculateNextReviewDate = (confidence, currentInterval) => {
    let newInterval;
    switch (confidence) {
        case 'unhappy':
            newInterval = 1; // See again today and tomorrow
            break;
        case 'neutral':
            newInterval = currentInterval; // Keep current interval
            break;
        case 'happy':
            newInterval = currentInterval * 2; // Double the interval
            break;
        default:
            newInterval = currentInterval;
            break;
    }
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
    return nextReviewDate;
};

export async function POST(req) {
    await connectMongoDB(); // Ensure Mongoose connection is established
    
    const { userEmail, kanjiId, confidence } = await req.json();
    console.log(userEmail, kanjiId, confidence);

    if (!userEmail || !kanjiId || !confidence) {
        return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    const currentInterval = 1; // Default interval
    const nextReviewDate = calculateNextReviewDate(confidence, currentInterval);

    try {
        let currentProgress = await Progress.findOne({ userEmail: userEmail, kanjiId: kanjiId }).exec();

        if (currentProgress) {
            // Update existing progress
            currentProgress.nextReviewDate = nextReviewDate;
            currentProgress.currentIntervalDays = currentInterval;
            currentProgress.confidence = confidence;
            // Add or update review in reviews array here as needed
        } else {
            // Create new progress if it doesn't exist
            currentProgress = new Progress({
                userEmail: userEmail,
                kanjiId,
                confidence,
                nextReviewDate,
                currentIntervalDays: currentInterval,
                reviews: [{ reviewDate: new Date(), confidence, intervalDays: currentInterval }]
            });
        }
        await currentProgress.save();
        return NextResponse.json({ message: "Progress updated." }, { status: 200 });
    } catch (error) {
        console.error("Error updating progress:", error);
        return NextResponse.json({ message: "An error occurred updating the Kanji's progress." }, { status: 500 });
    }
}