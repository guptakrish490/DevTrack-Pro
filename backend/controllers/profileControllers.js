import Activity from "../models/activity.js";
import Goal from "../models/goal.js";
import Project from "../models/project.js";
import Task from "../models/task.js";
import User from "../models/user.js";
import { logActivity } from "../utils/logActivity.js";
import { updateStreak } from "../utils/streakCount.js";

export const getProfile = async (req, res) => {
    const user = req.user
    try {
        const [goals, projects, tasks, activities] = await Promise.all([
            Goal.find({ user: user._id }).sort({ createdAt: -1 }),
            Project.find({ user: user._id }).sort({ createdAt: -1 }),
            Task.find({ user: user._id }).sort({ createdAt: -1 }),
            Activity.find({ user: user._id }).sort({ createdAt: -1 })
        ]);

        const goalCount = goals.length
        const projectCount = projects.length
        const taskCount = tasks.length
        const completedGoalCount = goals.filter(g => g.isCompleted === true).length
        const completedProjectCount = projects.filter(p => p.status === "Completed").length
        const completedTaskCount = tasks.filter(t => t.status === "Completed").length;
        const currentStreaksCount = user.currentStreak;
        const maxStreaksCount = user.longestStreak;

        res.status(200).json({
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            links: user.links,
            others: user.others,
            avatarURL: user.avatarURL,
            joinedOn: user.createdAt,
            lastActiveOn: activities[0].createdAt,

            goalCount,
            completedGoalCount,

            projectCount,
            completedProjectCount,

            taskCount,
            completedTaskCount,

            currentStreaksCount,
            maxStreaksCount,

            activities
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const user = req.user

        const { newName, newUsername, newBio, newAvatar, newGithubURL, newLeetcodeURL } = req.body

        const updatedUser = await User.findByIdAndUpdate(user._id, {
            name: newName,
            username: newUsername,
            bio: newBio,
            avatarURL: newAvatar,
            githubURL: newGithubURL,
            leetcodeURL: newLeetcodeURL
        }, { new: true })

        await logActivity({
            user: user._id,
            type: "profile_updated",
            title: `Updated Profile`,
        })

        await updateStreak(user._id)

        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}