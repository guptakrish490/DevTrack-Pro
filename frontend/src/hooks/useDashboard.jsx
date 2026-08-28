import { useCallback, useState } from "react";
import api from "../api/api.js";

export const useDashboard = () => {
    const [data, setData] = useState(null);
    const [goalsLimit, setGoalsLimit] = useState(5);
    const [tasksLimit, setTasksLimit] = useState(10);
    const [projectsLimit, setProjectsLimit] = useState(6);
    const [activitiesLimit, setActivitiesLimit] = useState(8);

    // Fetch dashboard data
    const fetchDashboard = useCallback(async () => {
        try {
            const res = await api.get("/dashboard", {
                params: { goalsLimit, projectsLimit, tasksLimit, activitiesLimit }
            });
            setData(res.data);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    }, [goalsLimit, tasksLimit, projectsLimit, activitiesLimit]);

    const handleChange = async (task) => {
        try {
            const res = await api.put(`/api/tasks/${task._id}`, {
                status: "Completed",
                completedAt: Date.now()
            });

            const updatedTask = res.data;

            setData((prev) => ({
                ...prev,
                tasks: prev.tasks.map((t) =>
                    t._id === updatedTask._id ? updatedTask : t
                ),
            }));
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return {
        data,
        fetchDashboard,
        handleChange
    };
};
