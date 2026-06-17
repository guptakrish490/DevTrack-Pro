import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        maxlength: 100
    },
    progress: {
        type: Number,
        required: true,
        default: 0
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: null,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


const Goal = mongoose.model('Goal', goalSchema)
export default Goal