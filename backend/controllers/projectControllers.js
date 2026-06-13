import Project from "../models/project.js"

export const createProject = async (req, res) => {
    try {
        const user = req.user
        const { title, description, relatedGoal, repoURL, liveURL, startDate, endDate, status } = req.body

        const newProject = new Project({ user: user._id, title, description, relatedGoal, repoURL, liveURL, startDate, endDate, status })
        await newProject.save()

        res.status(201).json({ message: "new project created successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}