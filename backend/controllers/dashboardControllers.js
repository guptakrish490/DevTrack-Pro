import Goal from "../models/goal.js"
import Project from "../models/project.js"
import Task from "../models/task.js"

export const getDashboardData = async (req, res) => {
    try {
        const user = req.user

        const [goals, projects, tasks] = await Promise.all([
            Goal.find({ user: user._id }),
            Project.find({ user: user._id }),
            Task.find({ user: user._id })
        ]);

        const goalCount = goals.length
        const projectCount = projects.length
        const completedTaskCount = tasks.filter(t => t.status === "Completed").length;
        const pendingTaskCount = tasks.filter(t => ["Planned", "In Progress"].includes(t.status)).length;
        const streaksCount = 0;


        res.status(200).json({
            user,
            goalCount,
            projectCount,
            completedTaskCount,
            pendingTaskCount,
            streaksCount,
            goals,
            projects,
            tasks
        })

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}