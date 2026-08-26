import Project from "../models/project.js"
import { logActivity } from "../utils/logActivity.js"
import { updateStreak } from "../utils/streakCount.js"

// controller for project creation
export const createProject = async (req, res) => {
    try {
        const user = req.user
        const { title, description, relatedGoal, techStack, repoURL, liveURL, startDate, endDate, status } = req.body

        const newProject = new Project({ user: user._id, title, description, relatedGoal, techStack, repoURL, liveURL, startDate, endDate, status })
        await newProject.save()

        await logActivity({
            user: user._id,
            type: "project_created",
            title: `Created Project: ${newProject.title}`,
            relatedProject: newProject._id
        })

        await updateStreak(user._id)

        res.status(201).json({ message: "New Project created successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controller for project retrieval
export const getProjects = async (req, res) => {
    try {
        const user = req.user

        const { q, status, techStack, sortBy } = req.query

        const query = {
            user: req.user._id
        }

        if (q) {
            query.title = {
                $regex: q,
                $options: "i"
            }
        }

        if (status) {
            query.status = { $regex: status, $options: "i" }
        }

        if (techStack) {
            query.techStack = { $regex: techStack, $options: "i" };
        }

        const sortOrder = sortBy === "oldest" ? 1 : -1;


        const projects = await Project.find(query).sort({ createdAt: sortOrder }).populate("relatedGoal")
        res.status(200).json(projects)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controller for project updation
export const updateProjects = async (req, res) => {
    try {

        const user = req.user
        const { title, description, techStack, repoURL, liveURL, startDate, endDate, status } = req.body

        const existingStatus = await Project.findById(req.params.id).select({ _id: 0, status: 1 });
        const project = await Project.findByIdAndUpdate(req.params.id,
            {
                title,
                description,
                techStack,
                repoURL,
                liveURL,
                startDate,
                endDate,
                status
            },

            { new: true }
        )

        if (project.status === "Completed" && existingStatus.status !== "Completed") {
            await logActivity({
                user: user._id,
                type: "project_completed",
                title: `Completed Project: ${project.title}`,
                relatedProject: project._id
            })

            await updateStreak(user._id)
        }


        res.status(200).json(project);
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controller for project deletion
export const deleteProjects = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Project Deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}