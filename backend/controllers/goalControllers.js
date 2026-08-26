import Goal from "../models/goal.js"
import { logActivity } from "../utils/logActivity.js"
import { updateStreak } from "../utils/streakCount.js"

// controller for goal creation
export const createGoal = async (req, res) => {

    try {
        const user = req.user
        const { title, description, startDate, endDate } = req.body

        const newGoal = new Goal({ user: user._id, title, description, startDate, endDate })
        await newGoal.save()

        await logActivity({
            user: user._id,
            type: "goal_created",
            title: `Created Goal: ${newGoal.title}`,
            relatedGoal: newGoal._id
        })

        await updateStreak(user._id)

        res.status(201).json({ message: "New Goal created successfully" })

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controller for goal retrieval
export const getGoals = async (req, res) => {
    try {
        const user = req.user

        const { q, completed, sortBy } = req.query
        const query = {
            user: req.user._id
        }
        if (q) {
            query.title = {
                $regex: q,
                $options: "i"
            }
        }
        if (completed) {
            query.isCompleted = completed === "true"
        }
        const sortOrder = sortBy === "oldest" ? 1 : -1;


        const goals = await Goal.find(query).sort({ createdAt: sortOrder })
        res.status(200).json(goals)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controller for goal updation
export const updateGoals = async (req, res) => {
    try {

        const user = req.user
        const { title, description, startDate, endDate, isCompleted } = req.body

        const existingStatus = await Goal.findById(req.params.id).select({ _id: 0, isCompleted: 1 })
        const goal = await Goal.findByIdAndUpdate(req.params.id,
            {
                title,
                description,
                startDate,
                endDate,
                isCompleted
            },
            { new: true }
        )

        if (isCompleted && !existingStatus.isCompleted) {
            await logActivity({
                user: user._id,
                type: "goal_completed",
                title: `Completed Goal: ${goal.title}`,
                relatedGoal: goal._id
            })

            await updateStreak(user._id)
        }

        res.status(200).json(goal)

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controller for goal deletion
export const deleteGoals = async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Goal deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}