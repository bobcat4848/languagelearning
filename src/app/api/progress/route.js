import { connectMongoDB } from "@lib/mongodb";
import Progress from "@models/progress";
import User from '@models/user';
import { NextResponse } from "next/server";

// Function to determine the next review date based on user confidence
const calculateNextReviewDate = (confidence, currentInterval) => {
    let newInterval;
    switch (confidence) {
        case 'unhappy':
            newInterval = 1; // See again very soon
            break;
        case 'neutral':
            newInterval = currentInterval; // No change
            break;
        case 'happy':
            newInterval = Math.min(currentInterval * 2, 60); // Cap at 60 days
            break;
        default:
            newInterval = currentInterval; // Default to current interval if unknown
    }
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
    return nextReviewDate;
};

export async function POST(req) {
    await connectMongoDB(); // Ensure Mongoose connection is established
    
    const { userEmail, kanjiId, confidence } = await req.json();
    console.log("test")
    console.log(userEmail, kanjiId, confidence);

    if (!userEmail || !kanjiId || !confidence) {
        return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    try {
        console.log(userEmail)
        const user = await User.findOne({ userEmail });
        console.log(user);
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found." }), { status: 404 });
        }

        console.log(user);
        const userId = user._id;
        const currentProgress = await Progress.findOne({ userId, kanjiId }).exec();
        const currentInterval = currentProgress ? currentProgress.currentIntervalDays : 1;
        const nextReviewDate = calculateNextReviewDate(confidence, currentInterval);

        if (currentProgress) {
            // Update existing progress
            currentProgress.nextReviewDate = nextReviewDate;
            currentProgress.currentIntervalDays = currentInterval;
            currentProgress.confidence = confidence;
            await currentProgress.save();
        } else {
            // Create new progress if not exists
            await new Progress({
                userId,
                kanjiId,
                confidence,
                nextReviewDate,
                currentIntervalDays: currentInterval
            }).save();
        }
        return new NextResponse.json(JSON.stringify({ message: "Progress updated." }), { status: 200 });
    } catch (error) {
        console.error("Error updating progress:", error);
        return new NextResponse.json(JSON.stringify({ message: "An error occurred updating the Kanji's progress." }), { status: 500 });
    }
}