import Activity from "../models/activity.js"
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

// controller for activities retrieval
export const getAllActivities = asyncHandler(async (req, res) => {
    const user = req.user;
    const { q, type, sortBy } = req.query;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);

    const query = { user: user._id };
    if (q) {
        query.title = { $regex: q, $options: "i" };
    }
    if (type) {
        query.type = { $regex: type, $options: "i" };
    }

    const sortOrder = sortBy === "oldest" ? 1 : -1;
    const skip = (page - 1) * limit;

    const activities = await Activity.find(query)
        .sort({ createdAt: sortOrder })
        .select({ relatedGoal: 0, relatedProject: 0, relatedTask: 0, updatedAt: 0 })
        .skip(skip)
        .limit(limit + 1)
        .lean();

    if (!activities) throw new AppError("Activities not found!", 404);

    res.status(200).json(activities);
});

// controller for activities deletion
export const deleteAllActivities = asyncHandler(async (req, res) => {
    const user = req.user

    const deletedActivities = await Activity.deleteMany({ user: user._id })
    if (!deletedActivities) throw new AppError("No activities found!", 404);
    res.status(200).json({ message: "Activities deleted successfully" })
});