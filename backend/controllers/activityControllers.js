import Activity from "../models/activity.js"

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

        const activities = await Activity.find({ user: user._id })
        res.status(200).json(activities)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getUniqueActivity = async (req, res) => {
    try {
        const user = req.user

        const activity = await Activity.findById(req.params.id);

        if (!activity) {
            return res.status(404).json({ error: "Activity not found" })
        }
        res.status(200).json(activity)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteAllActivities = async (req, res) => {
    try {
        const user = req.user

        await Activity.deleteMany({ user: user._id })
        res.status(200).json({ message: "Deleted activities successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}