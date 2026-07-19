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
        const completedGoalCount = goals.filter(g => g.isCompleted === true).length

        const projectCount = projects.length
        const completedProjectCount = projects.filter(p => p.status === "Completed").length

        const taskCount = tasks.length
        const completedTaskCount = tasks.filter(t => t.status === "Completed").length;

        const currentStreaksCount = user.currentStreak;
        const maxStreaksCount = user.longestStreak;


        res.status(200).json({
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            gender: user.gender,
            location: user.Location,
            links: user.links,
            others: user.others,
            avatarURL: user.avatarURL,
            joinedOn: user.createdAt,
            lastActiveOn: activities.length > 0 ? activities[0].createdAt : null,

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

        const { name, bio, gender, Location, username, email, others, links, avatarURL } = req.body

        const updatedUser = await User.findByIdAndUpdate(user._id, {
            name,
            bio,
            gender,
            Location,
            username,
            email,
            others,
            links,
            avatarURL
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