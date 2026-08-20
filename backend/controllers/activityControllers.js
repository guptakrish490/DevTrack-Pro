import Activity from "../models/activity.js"

// controller for activities retrieval
export const getAllActivities = async (req, res) => {
    try {
        const user = req.user

        const { q, type, sortBy } = req.query
        const query = { user: user._id };
        if (q) {
            query.title = { $regex: q, $options: "i" };
        }
        if (type) {
            query.type = { $regex: type, $options: "i" };
        }
        const sortOrder = sortBy === "oldest" ? 1 : -1;

        const activities = await Activity.find(query)
            .sort({ createdAt: sortOrder })
            .populate("relatedGoal")
            .populate("relatedProject")
            .populate("relatedTask")

        res.status(200).json(activities);
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controller for activities deletion
export const deleteAllActivities = async (req, res) => {
    try {
        const user = req.user

        await Activity.deleteMany({ user: user._id })
        res.status(200).json({ message: "Activities deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}