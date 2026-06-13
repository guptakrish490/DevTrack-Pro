import Goal from "../models/goal.js"

export const createGoal = async (req, res) => {

    try {
        const user = req.user
        const { title, description, startDate, endDate } = req.body

        const newGoal = new Goal({ user: user._id, title, description, startDate, endDate })
        await newGoal.save()

        res.status(201).json({ message: "new goal created successfully" })

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getGoals = async (req, res) => {
    try {
        const user = req.user

        const goals = await Goal.find({ user: user._id })
        res.status(200).json(goals)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}