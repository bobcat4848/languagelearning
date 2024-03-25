import mongoose, { Schema, models } from "mongoose";

const reviewSchema = new Schema({
  reviewDate: {
    type: Date,
    required: true
  },
  confidence: {
    type: String,
    required: true,
    enum: ['happy', 'neutral', 'unhappy']
  },
  intervalDays: {
    type: Number,
    required: true
  }
}, { _id: false }); // _id is not necessary for subdocuments here

const progressSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  kanjiId: {
    type: String, // Assuming Kanji ID is a string; adjust as necessary.
    required: true
  },
  confidence: {
    type: String,
    required: true,
    enum: ['happy', 'neutral', 'unhappy']
  },
  reviews: [reviewSchema],
  nextReviewDate: {
    type: Date,
    required: true
  },
  currentIntervalDays: {
    type: Number,
    required: true
  },
}, {timestamps: true});

const Progress = models.Progress || mongoose.model("Progress", progressSchema);
export default Progress;