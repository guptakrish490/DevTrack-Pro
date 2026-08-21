import User from '../models/user.js'

export const updateStreak = async (userId) => {
    const user = await User.findById(userId);
    if (!user) return;

    try {
        const now = new Date();
        const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (!user.lastActivity) {
            user.currentStreak = 1;
            user.longestStreak = 1;
            user.lastActivity = now;
            await user.save();
            return;
        }

        const lastActivityDate = new Date(user.lastActivity);
        const normalizedLast = new Date(lastActivityDate.getFullYear(), lastActivityDate.getMonth(), lastActivityDate.getDate());

        const msPerDay = 1000 * 60 * 60 * 24;
        const dayDifference = Math.round((currentDate - normalizedLast) / msPerDay);

        if (dayDifference === 0) {
            // same day → streak unchanged
            return;
        } else if (dayDifference === 1) {
            // consecutive day → increment
            user.currentStreak = (user.currentStreak || 0) + 1;
        } else {
            // missed days → reset
            user.currentStreak = 1;
        }


        if (!user.longestStreak || user.currentStreak > user.longestStreak) {
            user.longestStreak = user.currentStreak;
        }

        user.lastActivity = now;
        await user.save();

    } catch (err) {
        console.log("Error Updating Streak:", err.message);
    }
};
