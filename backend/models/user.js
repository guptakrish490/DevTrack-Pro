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
    location: {
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
        instituteName: { type: String },
        skills: [{ type: String }]
    },
    bio: {
        type: String,
        maxlength: 3000
    },
    avatarURL: {
        type: String,
        default: "https://www.gravatar.com/avatar/?d=mp"
    },
    currentStreak: {
        type: Number,
        default: 1
    },
    longestStreak: {
        type: Number,
        default: 1
    },
    lastActivity: {
        type: Date,
        required: false,
        default: Date.now
    }

}, { timestamps: true })


const User = mongoose.model('User', userSchema)
export default User