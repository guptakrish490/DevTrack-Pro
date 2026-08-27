import { useCallback, useState } from "react";
import api from "../api/api.js";

export const useGoals = () => {
    const [goals, setGoals] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchGoals = useCallback(async (params = {}, pageNum = 1, reset = false) => {
        try {
            setLoading(true);
            const res = await api.get('/api/goals', {
                params: { ...params, page: pageNum, limit }
            });

            const hasMoreFlag = res.data.length === limit + 1;
            setHasMore(hasMoreFlag);

            const goalsPage = hasMoreFlag ? res.data.slice(0, limit) : res.data;

            setGoals(prev => reset ? goalsPage : [...prev, ...goalsPage]);
        } catch (err) {
            console.error(err);
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
            return updatedGoal;
        } catch (err) {
            console.error(err);
        }
    };

    const createGoal = async (title, description, startDate, endDate) => {
        const res = await api.post('/api/goals', { title, description, startDate, endDate });
        const newGoal = res.data;

        setGoals(prev => [newGoal, ...prev]);
        return newGoal;
    };

    const updateGoal = async (initialData, title, description, startDate, endDate) => {
        const res = await api.put(`/api/goals/${initialData._id}`, { title, description, startDate, endDate });
        const updatedGoal = res.data;

        setGoals(prev => prev.map(g => g._id === updatedGoal._id ? updatedGoal : g));
        return updatedGoal;
    };

    const deleteGoal = async (goalId) => {
        await api.delete(`/api/goals/${goalId}`);

        setGoals(prev => prev.filter(g => g._id !== goalId));
    };


    return {
        goals, loading,
        fetchGoals, handleGoalCompletion,
        createGoal, updateGoal, deleteGoal,
        hasMore, page, setPage, setLimit
    };
};
