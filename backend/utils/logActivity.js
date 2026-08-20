import Activity from "../models/activity.js";
import User from "../models/user.js";
import { updateStreak } from "./streakCount.js";

// utility function to create activity logs automatically
export const logActivity = async ({
    user,
    type,
    title,
    relatedGoal = null,
    relatedProject = null,
    relatedTask = null
}) => {
    try {
        await Activity.create({
            user,
            type,
            title,
            relatedGoal,
            relatedProject,
            relatedTask
        });

        await User.findByIdAndUpdate(user._id, {
            lastActivity: Date.now()
        }, { returnDocument: "after" })

        await updateStreak(user._id);

    }
    catch (err) {
        console.log("Activity logging failed:", err.message)
    }
}