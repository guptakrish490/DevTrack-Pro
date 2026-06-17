import Activity from "../models/activity.js";
import Goal from "../models/goal.js";
import Project from "../models/project.js";
import Task from "../models/task.js";
import User from "../models/user.js";
import { logActivity } from "../utils/logActivity.js";

export const getProfile = async (req, res) => {
    const user = req.user
    try {
        const [goals, projects, tasks, activities] = await Promise.all([
            Goal.find({ user: user._id }),
            Project.find({ user: user._id }),
            Task.find({ user: user._id }),
            Activity.find({ user: user._id })
        ]);

        const goalCount = goals.length
        const projectCount = projects.length
        const completedTaskCount = tasks.filter(t => t.status === "Completed").length;
        const pendingTaskCount = tasks.filter(t => ["Planned", "In Progress"].includes(t.status)).length;
        const streaksCount = 0;

        res.status(200).json({
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            leetcodeURL: user.leetcodeURL,
            githubURL: user.githubURL,
            avatarURL: user.avatarURL,
            goalCount,
            projectCount,
            completedTaskCount,
            pendingTaskCount,
            streaksCount,
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

        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}