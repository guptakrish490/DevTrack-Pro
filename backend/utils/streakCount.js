import User from "../models/user.js";

// utility for streaks management
export const updateStreak = async (userId) => {
    const user = await User.findById(userId);
    if (!user) return;

    try {

        const now = new Date();
        const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const lastDateDoc = new Date(user?.lastActivity)

        if (!lastDateDoc) {
            user.currentStreak = 1;
            user.lastActivity = now;

            await user.save();
            return;
        }

        const lastActivityDate = new Date(lastDateDoc.getFullYear(), lastDateDoc.getMonth(), lastDateDoc.getDate());

        const msPerDay = 1000 * 60 * 60 * 24;
        const dayDifference = Math.round((currentDate - lastActivityDate) / msPerDay);

        
        if (dayDifference === 0) {    // same day
            return;
        } else if (dayDifference === 1) {   // next day
            user.currentStreak += 1;
        } else {
            user.currentStreak = 1;   // missed day resets streak to 1
        }

        await user.save();

    }
    catch (err) {
        console.log("Error Updating Streak:", err);

    }
}