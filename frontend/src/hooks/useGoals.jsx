import { useCallback, useState } from "react";
import api from "../api/api.js";

export const useGoals = () => {
    const [goals, setGoals] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    const [totalGoalCount, setTotalGoalCount] = useState(0);
    const [completedGoalCount, setCompletedGoalCount] = useState(0);
    const [pendingGoalCount, setPendingGoalCount] = useState(0);

    const [errors, setErrors] = useState({});

    const handleValidationError = (err) => {
        if (err?.response?.status === 400 && Array.isArray(err.response?.data?.error)) {
            const fieldErrors = {};
            err.response.data.error.forEach((e) => {
                fieldErrors[e.field] = e.message;
            });
            setErrors(fieldErrors);
        }
    };

    const fetchGoals = useCallback(async (params = {}, pageNum = 1, reset = false) => {
        try {
            setLoading(true);
            const res = await api.get("/api/goals", {
                params: { ...params, page: pageNum, limit }
            });

            setTotalGoalCount(res.data.totalGoalCount);
            setCompletedGoalCount(res.data.completedGoalCount);
            setPendingGoalCount(res.data.pendingGoalCount);

            const hasMoreFlag = res.data.goals.length === limit + 1;
            setHasMore(hasMoreFlag);

            const goalsPage = hasMoreFlag ? res.data.goals.slice(0, limit) : res.data.goals;
            setGoals(prev => reset ? goalsPage : [...prev, ...goalsPage]);
            setErrors({});
        } catch (err) {
            handleValidationError(err);
        } finally {
            setLoading(false);
        }
    }, [limit]);

    const handleGoalCompletion = async (goal) => {
        try {
            const updated = !goal.isCompleted;
            const res = await api.put(`/api/goals/${goal._id}`, { ...goal, isCompleted: updated });
            const updatedGoal = res.data;

            setGoals(prev => prev.map(g => g._id === updatedGoal._id ? updatedGoal : g));
            if (updated) {
                setCompletedGoalCount(prev => prev + 1);
                setPendingGoalCount(prev => prev - 1);
            } else {
                setCompletedGoalCount(prev => prev - 1);
                setPendingGoalCount(prev => prev + 1);
            }
            setErrors({});
            return updatedGoal;
        } catch (err) {
            handleValidationError(err);
            throw err;
        }
    };

    const createGoal = async (title, description, startDate, endDate) => {
        try {
            const res = await api.post("/api/goals", { title, description, startDate, endDate });
            const newGoal = res.data;

            setGoals(prev => [newGoal, ...prev]);
            setTotalGoalCount(prev => prev + 1);
            setPendingGoalCount(prev => prev + 1);
            setErrors({});
            return newGoal;
        } catch (err) {
            handleValidationError(err);
            throw err;
        }
    };

    const updateGoal = async (initialData, title, description, startDate, endDate) => {
        try {
            const res = await api.put(`/api/goals/${initialData._id}`, { title, description, startDate, endDate });
            const updatedGoal = res.data;

            setGoals(prev => prev.map(g => g._id === updatedGoal._id ? updatedGoal : g));
            setErrors({});
            return updatedGoal;
        } catch (err) {
            handleValidationError(err);
            throw err;
        }
    };

    const deleteGoal = async (goalId) => {
        const goal = goals.find(g => g._id === goalId);
        await api.delete(`/api/goals/${goalId}`);

        setGoals(prev => prev.filter(g => g._id !== goalId));
        setTotalGoalCount(prev => prev - 1);
        if (goal.isCompleted) {
            setCompletedGoalCount(prev => prev - 1);
        } else {
            setPendingGoalCount(prev => prev - 1);
        }
    };

    return {
        goals, loading,
        fetchGoals, handleGoalCompletion,
        createGoal, updateGoal, deleteGoal,
        hasMore, page, setPage, setLimit,
        totalGoalCount, completedGoalCount, pendingGoalCount,
        errors, setErrors
    };
};
