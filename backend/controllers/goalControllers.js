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


        const goals = await Goal.find(query).sort({ startDate: sortOrder })
        res.status(200).json(goals)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateGoals = async (req, res) => {
    try {
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