import Goal from "../models/goal.js"
import AppError from "../utils/AppError.js"
import asyncHandler from "../utils/asyncHandler.js"
import { logActivity } from "../utils/logActivity.js"
import { updateStreak } from "../utils/streakCount.js"

// controller for goal creation
export const createGoal = asyncHandler(async (req, res) => {

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

    res.status(201).json(newGoal)

})

// controller for goal retrieval
export const getGoals = asyncHandler(async (req, res) => {
    let { q, completed, sortBy } = req.query

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
    if (completed) {
        query.isCompleted = completed === "true"
    }
    const sortOrder = sortBy === "oldest" ? 1 : -1;
    const skip = (page - 1) * limit;

    const goals = await Goal.find(query)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limit + 1)
        .lean();

    if (!goals)
        throw new AppError("No Goals found!", 404)

    const [totalGoalCount, completedGoalCount, pendingGoalCount] = await Promise.all([
        Goal.countDocuments({ user: req.user._id }),
        Goal.countDocuments({ user: req.user._id, isCompleted: true }),
        Goal.countDocuments({ user: req.user._id, isCompleted: false }),
    ]);

    res.status(200).json({ goals, totalGoalCount, completedGoalCount, pendingGoalCount })
})

// controller for goal updation
export const updateGoals = asyncHandler(async (req, res) => {
    const user = req.user
    const { title, description, startDate, endDate, isCompleted } = req.body

    const existingStatus = await Goal.findById(req.params.id).select({ _id: 0, isCompleted: 1 })
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,
        {
            title,
            description,
            startDate,
            endDate,
            isCompleted
        },
        { new: true }
    )

    if (!updatedGoal) throw new AppError("Goal not found", 404);

    if (isCompleted && !existingStatus.isCompleted) {
        await logActivity({
            user: user._id,
            type: "goal_completed",
            title: `Completed Goal: ${updatedGoal.title}`,
            relatedGoal: updatedGoal._id
        })

        await updateStreak(user._id)
    }

    res.status(200).json(updatedGoal)

})

// controller for goal deletion
export const deleteGoals = asyncHandler(async (req, res) => {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id)

    if (!deletedGoal) throw new AppError("Goal not found", 404);

    res.status(204).json({ message: "Goal deleted successfully" })
})