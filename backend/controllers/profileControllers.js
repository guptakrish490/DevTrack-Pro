import Activity from "../models/activity.js";
import Goal from "../models/goal.js";
import Project from "../models/project.js";
import Task from "../models/task.js";
import User from "../models/user.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { logActivity } from "../utils/logActivity.js";

// controller for profile retrieval
export const getProfile = asyncHandler(async (req, res) => {
    const user = req.user
    const [goals, projects, tasks, activities] = await Promise.all([
        Goal.find({ user: user._id }).sort({ createdAt: -1 }).lean(),
        Project.find({ user: user._id }).sort({ createdAt: -1 }).lean(),
        Task.find({ user: user._id }).sort({ createdAt: -1 }).lean(),
        Activity.find({ user: user._id }).sort({ createdAt: -1 }).lean()
    ]);

    if (!(goals && projects && tasks && activities)) throw new AppError("No data found", 404);

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
        location: user.location,
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
})

// controller for profile updation
export const updateProfile = asyncHandler(async (req, res) => {
    const user = req.user

    const { name, bio, gender, location, username, email, others, links, avatarURL } = req.body

    const updatedUser = await User.findByIdAndUpdate(user._id, {
        name,
        bio,
        gender,
        location,
        username,
        email,
        others,
        links,
        avatarURL
    }, { new: true })

    if (!updatedUser) throw new AppError("No data found", 404);


    await logActivity({
        user: user._id,
        type: "profile_updated",
        title: `Updated Profile`,
    })


    res.status(200).json(updatedUser)

})