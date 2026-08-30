import Activity from "../models/activity.js";
import asyncHandler from "./asyncHandler.js";
import { updateStreak } from "./streakCount.js";

// utility function to create activity logs automatically
export const logActivity = asyncHandler(async ({
    user,
    type,
    title,
    relatedGoal = null,
    relatedProject = null,
    relatedTask = null
}) => {
    const activity = await Activity.create({
        user,
        type,
        title,
        relatedGoal,
        relatedProject,
        relatedTask
    });

    updateStreak(user._id);
    return activity;

})