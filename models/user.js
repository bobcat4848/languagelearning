import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String,
        required: false,
    },
    resetTokenExpires: {
        type: Date,
        required: false
    },
}, {timestamps: true});

const User = models.User || mongoose.model("User", userSchema);
export default User;