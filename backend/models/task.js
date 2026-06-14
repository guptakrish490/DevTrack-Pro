import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    relatedProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    },
    title: {
        type: String,
        required: true,
        maxlength: 80
    },
    description: {
        type: String,
        required: true,
        maxlength: 200
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true,
        default: "Medium"
    },
    status: {
        type: String,
        enum: ["Planned", "In Progress", "Completed"],
        required: false,
        default: "Planned"
    },
    startDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    completedAt: {
        type: Date,
        required: false,
        default: null
    },
    dueDate: {
        type: Date,
        required: false,
        default: null
    }
}, { timestamps: true })


const Task = mongoose.model('Task', taskSchema)
export default Task