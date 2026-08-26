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
        maxlength: 200,
        minlength:5
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000,
        defualt:"No description..."
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
goalSchema.index({ user: 1, createdAt: -1 });

export default Goal