import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from '@models/user';
import Progress from "@models/progress";
import Kanji from 'kanji.js';
import crypto from 'crypto';

// Store Kanji in hexadecimal
function generateKanjiId(kanji) {
    const hash = crypto.createHash('sha256');
    hash.update(kanji.literal); 
    return hash.digest('hex'); 
}

export async function POST(req) {
    if (req.method === 'POST') {
        const { userEmail } = await req.json();
        
        if (!userEmail) {
            return NextResponse.json({ message: "Email is required as a query parameter." }, {status: 400});
        }

        await connectMongoDB();

        try {
            // Fetch user by email
            const user = await User.findOne({ email: userEmail });
            if (!user) {
                return NextResponse.json({ message: "User not found" }, {status: 404});
            }

            const userId = user._id;

            // Fetch user progress
            const progressRecords = await Progress.find({ userId }).exec();
            const learnedKanjiIds = progressRecords.map(p => p.kanjiId);
            const reviewableKanji = progressRecords.filter(p => new Date(p.nextReviewDate) <= new Date()).map(p => p.kanjiId);

            // Get all kanji characters
            const allKanji = Kanji.dump().map(kanji => ({
                ...kanji,
                id: generateKanjiId(kanji)
            })).filter(obj => obj.freq !== null).sort((a, b) => a.freq - b.freq);
            const newKanji = allKanji.filter(kanji => !learnedKanjiIds.includes(kanji.id)).slice(0, 10);
            const kanjiForReview = allKanji.filter(kanji => reviewableKanji.includes(kanji.id));

            // Mark kanji as new or for review
            const markedNewKanji = newKanji.map(kanji => ({ ...kanji, status: 'new' }));
            const markedReviewKanji = kanjiForReview.map(kanji => ({ ...kanji, status: 'review' }));

            // Combine new kanji and kanji for review
            const kanjiToStudy = [...markedNewKanji, ...markedReviewKanji];

            return NextResponse.json({kanjiToStudy}, {status: 200});
        } catch (error) {
            console.error("Server error:", error);
            return NextResponse.json({ message: "Internal server error" }, {status: 500});
        }
    } else {
        return NextResponse.json({ message: "Method Not Allowed"}, {status: 405});
    }
}
