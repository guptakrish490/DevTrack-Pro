import Task from "../models/task.js"
import { logActivity } from "../utils/logActivity.js"
import { updateStreak } from "../utils/streakCount.js"

// controller for task craetion
export const createTasks = async (req, res) => {
    try {
        const user = req.user
        const { title, description, relatedProject, priority, status, startDate, completedAt, dueDate } = req.body

        const newTask = new Task({
            user: user._id,
            title,
            description,
            relatedProject,
            priority,
            status,
            startDate,
            completedAt,
            dueDate
        })

        await newTask.save()

        await logActivity({
            user: user._id,
            type: "task_created",
            title: `Created Task: ${newTask.title}`,
            relatedTask: newTask._id
        })

        await updateStreak(user._id)

        res.status(201).json(newTask)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controller for task retrieval
export const readTasks = async (req, res) => {
    try {
        //user from verification middleware
        const user = req.user

        // query processing for search, sort, filter
        const { q, status, sortBy, priority } = req.query

        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);

        const query = { user: user._id };

        if (q) {
            query.title = { $regex: q, $options: "i" };
        }

        if (status) {
            query.status = { $regex: status, $options: "i" };
        }

        if (priority) {
            query.priority = { $regex: priority, $options: "i" };
        }

        const sortOrder = sortBy === "oldest" ? 1 : -1;
        const skip = (page - 1) * limit;


        //fetching tasks
        const tasks = await Task.find(query)
            .sort({ createdAt: sortOrder })
            .populate("relatedProject")
            .skip(skip)
            .limit(limit + 1)

        const [totalTasks, completedTasks, pendingTasks, overdueTasks] = await Promise.all([
            Task.countDocuments({ user: req.user._id }),
            Task.countDocuments({ user: req.user._id, status: "Completed" }),
            Task.countDocuments({ user: req.user._id, status: { $in: ["Planned", "In Progress"] } }),
            Task.countDocuments({ user: req.user._id, dueDate: { $lt: new Date() }, status: { $ne: "Completed" } })
        ]);


        res.status(200).json({ tasks, totalTasks, completedTasks, pendingTasks, overdueTasks });
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controller for task updation
export const updateTasks = async (req, res) => {
    try {

        const user = req.user
        const { title, description, relatedProject, priority, status, startDate, completedAt, dueDate } = req.body

        const existingStatus = await Task.findById(req.params.id).select({ _id: 0, status: 1 });
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
            title,
            description,
            relatedProject,
            priority,
            status,
            startDate,
            completedAt,
            dueDate
        },
            { new: true })

        if (updatedTask.status === "Completed" && existingStatus.status !== "Completed") {
            await logActivity({
                user: user._id,
                type: "task_completed",
                title: `Completed Task: ${updatedTask.title}`,
                relatedTask: updatedTask._id
            })

            await updateStreak(user._id)
        }

        res.status(200).json(updatedTask)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controller for task deletion
export const deleteTasks = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Task Deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}