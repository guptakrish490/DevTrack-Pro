import Goal from "../models/goal.js";
import Project from "../models/project.js";
import Task from "../models/task.js";
import Activity from "../models/activity.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Controller to retrieve dashboard data
export const getDashboardData = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const goalsLimit = Math.max(1, parseInt(req.query.goalsLimit) || 5);
        const projectsLimit = Math.max(1, parseInt(req.query.projectsLimit) || 5);
        const tasksLimit = Math.max(1, parseInt(req.query.tasksLimit) || 5);
        const activitiesLimit = Math.max(1, parseInt(req.query.activitiesLimit) || 5);

        const [goals, projects, tasks, activities] = await Promise.all([
            Goal.find({ user: user._id })
                .sort({ createdAt: -1 })
                .limit(goalsLimit)
                .lean(),
            Project.find({ user: user._id })
                .populate("relatedGoal")
                .sort({ createdAt: -1 })
                .limit(projectsLimit)
                .lean(),
            Task.find({ user: user._id })
                .populate("relatedProject")
                .sort({ createdAt: -1 })
                .limit(tasksLimit)
                .lean(),
            Activity.find({ user: user._id })
                .populate("relatedGoal relatedProject relatedTask")
                .sort({ createdAt: -1 })
                .limit(activitiesLimit)
                .lean(),
        ]);

        const [allGoals, allProjects, allTasks] = await Promise.all([
            Goal.find({ user: user._id }).lean(),
            Project.find({ user: user._id }).lean(),
            Task.find({ user: user._id }).lean(),
        ]);

        if (!(goals && projects && tasks && activities)) throw new AppError("No data found", 404);

        const completedGoalCount = allGoals.filter((g) => g.isCompleted).length;
        const pendingGoalCount = allGoals.filter((g) => !g.isCompleted).length;

        const completedProjectCount = allProjects.filter(
            (p) => p.status === "Completed"
        ).length;
        const pendingProjectCount = allProjects.filter((p) =>
            ["Planned", "In Progress"].includes(p.status)
        ).length;

        const completedTaskCount = allTasks.filter(
            (t) => t.status === "Completed"
        ).length;
        const pendingTaskCount = allTasks.filter((t) =>
            ["Planned", "In Progress"].includes(t.status)
        ).length;

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
            activities,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
