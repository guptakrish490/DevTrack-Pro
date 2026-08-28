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

        res.status(201).json(newProject)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controller for project retrieval
export const getProjects = async (req, res) => {
    try {
        const { q, status, techStack, sortBy } = req.query

        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);

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
        const skip = (page - 1) * limit;


        const projects = await Project.find(query)
            .sort({ createdAt: sortOrder })
            .populate("relatedGoal")
            .skip(skip)
            .limit(limit + 1)

        const [totalProjects, completedProjects, activeProjects] = await Promise.all([
            Project.countDocuments({ user: req.user._id }),
            Project.countDocuments({ user: req.user._id, status: "Completed" }),
            Project.countDocuments({ user: req.user._id, status: { $in: ["Planned", "In Progress"] } }),
        ]);


        res.status(200).json({ projects, totalProjects, completedProjects, activeProjects })
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
        const updatedProject = await Project.findByIdAndUpdate(req.params.id,
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

        if (updatedProject.status === "Completed" && existingStatus.status !== "Completed") {
            await logActivity({
                user: user._id,
                type: "project_completed",
                title: `Completed Project: ${updatedProject.title}`,
                relatedProject: updatedProject._id
            })

            await updateStreak(user._id)
        }


        res.status(200).json(updatedProject);
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