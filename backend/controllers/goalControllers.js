import Goal from "../models/goal.js"
import { logActivity } from "../utils/logActivity.js"
import { updateStreak } from "../utils/streakCount.js"

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

        res.status(201).json({ message: "new goal created successfully" })

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

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

export const updateGoals = async (req, res) => {
    try {

        const user = req.user
        const { newTitle, newDescription, newStartDate, newEndDate, isCompleted } = req.body

        const goal = await Goal.findByIdAndUpdate(req.params.id,
            {
                title: newTitle,
                description: newDescription,
                startDate: newStartDate,
                endDate: newEndDate,
                isCompleted
            },
            { new: true }
        )

        if (goal.isCompleted) {
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

export const deleteGoals = async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "goal deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}