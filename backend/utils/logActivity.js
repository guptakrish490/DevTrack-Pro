import Activity from "../models/activity.js";

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
    }
    catch (err) {
        console.log("Activity logging failed:", err.message)
    }
}