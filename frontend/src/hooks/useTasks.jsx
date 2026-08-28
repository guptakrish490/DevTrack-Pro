import { useCallback, useState } from "react"
import api from "../api/api.js"

export const useTasks = () => {

    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    // fetch tasks on call without page reload
    const fetchTasks = useCallback(async (params = {}, pageNum = 1, reset = false) => {
        try {
            setLoading(true);
            const res = await api.get(`/api/tasks`,
                { params: { ...params, page: pageNum, limit: limit } }
            )

            const hasMoreFlag = res.data.length === limit + 1;
            setHasMore(hasMoreFlag);

            const tasksPage = hasMoreFlag ? res.data.slice(0, limit) : res.data;
            setTasks(prev => reset ? tasksPage : [...prev, ...tasksPage]);
        }
        catch (err) {
            console.log(err.response?.data || err.message)
        } finally {
            setLoading(false);
        }
    }, [limit]);

    const createTask = async (title, description, priority, status, startDate, completedAt, dueDate, relatedProject) => {
        const res = await api.post(`/api/tasks`,
            {
                title,
                description,
                priority,
                status,
                startDate,
                completedAt,
                dueDate,
                relatedProject
            }
        )
        const newTask = res.data;

        setTasks(prev => [newTask, ...prev]);
        return newTask;
    }

    const updateTask = async (taskToEdit, title, description, priority, status, startDate, completedAt, dueDate, relatedProject) => {

        let res;
        if (taskToEdit.status !== "Completed" && status === "Completed") {
            res = await api.put(`/api/tasks/${taskToEdit._id}`,
                {
                    title,
                    description,
                    priority,
                    status,
                    startDate,
                    completedAt: Date.now(),
                    dueDate,
                    relatedProject: relatedProject._id
                }
            )
        }
        else if (taskToEdit.status === "Completed" && status !== "Completed") {
            res = await api.put(`/api/tasks/${taskToEdit._id}`,
                {
                    title,
                    description,
                    priority,
                    status,
                    startDate,
                    completedAt: null,
                    dueDate,
                    relatedProject
                }
            )
        }
        else {
            res = await api.put(`/api/tasks/${taskToEdit._id}`,
                {
                    title,
                    description,
                    priority,
                    status,
                    startDate,
                    completedAt,
                    dueDate,
                    relatedProject
                }
            )
        }
        const updatedTask = res.data;

        setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
        return updatedTask;
    }

    const deleteTask = async (taskId) => {
        await api.delete(`/api/tasks/${taskId}`)
        setTasks(prev => prev.filter(t => t._id !== taskId));
    }

    const updatePriorityStatus = async (task, status, priority) => {
        let res;
        if (status === "Completed") {
            res = await api.put(`/api/tasks/${task._id}`,
                {
                    status: status || task.status,
                    priority: priority || task.priority,
                    completedAt: Date.now()
                }
            );
        }
        if (status !== "Completed") {
            res = await api.put(`/api/tasks/${task._id}`,
                {
                    status: status || task.status,
                    priority: priority || task.priority,
                    completedAt: null
                }
            );
        }
        const updatedTask = res.data;

        setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
        return updatedTask;
    }

    return {
        tasks,
        fetchTasks,
        createTask, updateTask, deleteTask, updatePriorityStatus,
        hasMore, page, setPage, setLimit, loading
    }
}