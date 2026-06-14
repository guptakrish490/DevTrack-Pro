import Task from "../models/task.js"

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

        res.status(201).json(newTask)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const readTasks = async (req, res) => {
    try {
        const user = req.user
        const tasks = await Task.find({ user: user._id })

        res.status(200).json(tasks)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateTasks = async (req, res) => {
    try {
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

        res.status(200).json(task)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}