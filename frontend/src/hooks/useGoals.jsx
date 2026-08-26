import { useCallback, useState } from "react";
import api from "../api/api.js";

export const useGoals = () => {
    const [goals, setGoals] = useState([]);
    const [goalCompleted, setGoalCompleted] = useState(false);

    const fetchGoals = useCallback(async (params) => {
        const res = await api.get("/api/goals", { params });
        setGoals(res.data);
    }, []);

    const handleGoalCompletion = async (goal) => {
        try {
            const updated = !goal.isCompleted;
            await api.put(`/api/goals/${goal._id}`, { ...goal, isCompleted: updated });
            fetchGoals();
        } catch (err) {
            console.error(err);
        }
    };

    const createGoal = async (title, description, startDate, endDate) => {
        await api.post(`/api/goals`,
            {
                title,
                description,
                startDate,
                endDate
            }
        )
    }

    const updateGoal = async (initialData, title, description, startDate, endDate) => {
        await api.put(`/api/goals/${initialData._id}`,
            {
                title,
                description,
                startDate,
                endDate
            })
    }


    return {
        goals,
        goalCompleted, setGoalCompleted,
        fetchGoals, handleGoalCompletion,
        createGoal, updateGoal
    };
};
