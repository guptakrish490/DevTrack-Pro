import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ["Male", "Female", "Others"]
    },
    Location: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    links: [
        {
            platform: { type: String, required: true },
            url: { type: String, required: true }
        }
    ],
    others: {
        workplace: { type: String },
        role: { type: String },
        instituteName: { type: String, required: true },
        skills: [{ type: String }]
    },
    bio: {
        type: String,
        maxlength: 500
    },
    avatarURL: {
        type: String,
        default: "https://example.com/default-avatar.png"
    },
    currentStreak: {
        type: Number,
        default: 0
    },
    longestStreak: {
        type: Number,
        default: 0
    }

}, { timestamps: true })


const User = mongoose.model('User', userSchema)
export default User