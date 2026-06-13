import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    leetcodeURL: {
        type: String,
    },
    githubURL: {
        type: String
    },
    bio: {
        type: String,
        maxlength: 200
    },
    avatarURL: {
        type: String,
        default: "https://example.com/default-avatar.png"
    }

}, { timestamps: true })


const User = mongoose.model('User', userSchema)
export default User