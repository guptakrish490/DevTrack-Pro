import Activity from "../models/activity.js";
import User from "../models/user.js";

export const updateStreak = async (userId) => {
    try {
        // Get last 365 activities
        const activities = await Activity.find({ user: userId })
            .select("createdAt")
            .sort({ createdAt: -1 })
            .limit(365);

        // Extract unique days (YYYY-MM-DD) and sort descending
        const uniqueDays = [...new Set(
            activities.map(a => a.createdAt.toISOString().split("T")[0])
        )].sort((a, b) => new Date(b) - new Date(a));

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (let day of uniqueDays) {
            const activityDate = new Date(day);
            activityDate.setHours(0, 0, 0, 0);

            const difference = (currentDate - activityDate) / (1000 * 60 * 60 * 24);

            if (difference === streak) {
                streak++;
            } else {
                break;
            }
        }

        const user = await User.findById(userId);
        user.currentStreak = streak;
        if (streak > user.longestStreak) {
            user.longestStreak = streak;
        }

        await user.save();
    } catch (err) {
        console.error("Error updating streak:", err);
    }
};
