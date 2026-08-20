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
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 300
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: false
    },
    endDate: {
        type: Date,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


const Goal = mongoose.model('Goal', goalSchema)
export default Goal