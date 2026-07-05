import Project from "../models/project.js"
import { logActivity } from "../utils/logActivity.js"
import { updateStreak } from "../utils/streakCount.js"

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

        res.status(201).json({ message: "new project created successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

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

export const updateProjects = async (req, res) => {
    try {

        const user = req.user
        const { newTitle, newDescription, newTechStack, newRepoURL, newLiveURL, newStartDate, newEndDate, newStatus } = req.body

        const project = await Project.findByIdAndUpdate(req.params.id,
            {
                title: newTitle,
                description: newDescription,
                techStack:newTechStack,
                repoURL: newRepoURL,
                liveURL: newLiveURL,
                startDate: newStartDate,
                endDate: newEndDate,
                status: newStatus
            },
            { new: true }
        )

        if (project.status === "Completed") {
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

export const deleteProjects = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "project deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}