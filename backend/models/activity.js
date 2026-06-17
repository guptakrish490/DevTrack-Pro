import mongoose, { Schema } from "mongoose";

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    relatedGoal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal',
        required: false
    },
    relatedProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    },
    relatedTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: false
    },
    type: {
        type: String,
        enum: [
            "goal_created",
            "goal_completed",
            "project_created",
            "project_completed",
            "task_created",
            "task_completed",
            "profile_updated"
        ],
        required: true
    }
}, { timestamps: true })


const Activity = mongoose.model('Activity', activitySchema)
export default Activity