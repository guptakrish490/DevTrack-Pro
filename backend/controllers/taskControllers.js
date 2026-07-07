import Task from "../models/task.js"
import { logActivity } from "../utils/logActivity.js"
import { updateStreak } from "../utils/streakCount.js"

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

export const readTasks = async (req, res) => {
    try {
        //user from verification middleware
        const user = req.user

        // query processing for search, sort, filter
        const { q, status, sortBy, priority } = req.query

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


        //fetching tasks
        const tasks = await Task.find(query).sort({ createdAt: sortOrder }).populate("relatedProject")
        res.status(200).json(tasks)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateTasks = async (req, res) => {
    try {

        const user = req.user

        const { newTitle, newDescription, newRelatedProject, newPriority, newStatus, newStartDate, newCompletedAt, newDueDate } = req.body
        const task = await Task.findByIdAndUpdate(req.params.id, {
            title: newTitle,
            description: newDescription,
            relatedProject: newRelatedProject,
            priority: newPriority,
            status: newStatus,
            startDate: newStartDate,
            completedAt: newCompletedAt,
            dueDate: newDueDate
        }, { new: true })

        if (task.status === "Completed") {
            await logActivity({
                user: user._id,
                type: "task_completed",
                title: `Completed Task: ${task.title}`,
                relatedTask: task._id
            })

            await updateStreak(user._id)
        }

        res.status(200).json(task)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteTasks = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "task deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}