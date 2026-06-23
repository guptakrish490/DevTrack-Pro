import Goal from "../models/goal.js"
import Project from "../models/project.js"
import Task from "../models/task.js"
import Activity from "../models/activity.js"

export const getDashboardData = async (req, res) => {
    try {
        const user = req.user

        const [goals, projects, tasks, activities] = await Promise.all([
            Goal.find({ user: user._id }),
            Project.find({ user: user._id }).populate("relatedGoal").sort({ createdAt: -1 }),
            Task.find({ user: user._id }).populate("relatedProject").sort({ createdAt: -1 }),
            Activity.find({ user: user._id }).populate("relatedGoal").populate("relatedProject").populate("relatedTask").sort({ createdAt: -1 })

        ]);

        const completedGoalCount = goals.filter(g => g.isCompleted === true).length
        const pendingGoalCount = goals.filter(g => g.isCompleted === false).length
        const completedProjectCount = projects.filter(p => p.status === "Completed").length
        const pendingProjectCount = projects.filter(p => ["Planned", "In Progress"].includes(p.status)).length
        const completedTaskCount = tasks.filter(t => t.status === "Completed").length;
        const pendingTaskCount = tasks.filter(t => ["Planned", "In Progress"].includes(t.status)).length;
        const currentStreaksCount = user.currentStreak;
        const maxStreaksCount = user.longestStreak;


        res.status(200).json({
            user,
            completedGoalCount,
            pendingGoalCount,
            completedProjectCount,
            pendingProjectCount,
            completedTaskCount,
            pendingTaskCount,
            currentStreaksCount,
            maxStreaksCount,
            goals,
            projects,
            tasks,
            activities
        })

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}