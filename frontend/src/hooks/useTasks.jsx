import { useCallback, useState } from "react"
import api from "../api/api.js"

export const useTasks = () => {
    const [tasks, setTasks] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(8)
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(false)

    const [totalTasks, setTotalTasks] = useState(0)
    const [completedTasks, setCompletedTasks] = useState(0)
    const [pendingTasks, setPendingTasks] = useState(0)
    const [overdueTasks, setOverdueTasks] = useState(0)
    const [errors, setErrors] = useState({})


    const handleValidationError = (err) => {
        if (err?.response?.status === 400 && Array.isArray(err.response?.data?.error)) {
            const fieldErrors = {};
            err.response.data.error.forEach((e) => {
                fieldErrors[e.field] = e.message;
            });
            setErrors(fieldErrors);
        }
    };

    // fetch tasks with counts
    const fetchTasks = useCallback(async (params = {}, pageNum = 1, reset = false) => {
        try {
            setLoading(true)
            const res = await api.get(`/api/tasks`, {
                params: { ...params, page: pageNum, limit }
            })

            setTotalTasks(res.data.totalTasks)
            setCompletedTasks(res.data.completedTasks)
            setPendingTasks(res.data.pendingTasks)
            setOverdueTasks(res.data.overdueTasks)

            const hasMoreFlag = res.data.tasks.length === limit + 1
            setHasMore(hasMoreFlag)

            const tasksPage = hasMoreFlag ? res.data.tasks.slice(0, limit) : res.data.tasks
            setTasks(prev => reset ? tasksPage : [...prev, ...tasksPage])
        } catch (err) {
            console.error(err.response?.data || err.message)
        } finally {
            setLoading(false)
        }
    }, [limit])



    // create task
    const createTask = async (title, description, priority, status, startDate, completedAt, dueDate, relatedProject) => {
        try {
            const res = await api.post(`/api/tasks`, {
                title, description, priority, status, startDate, completedAt, dueDate, relatedProject
            })
            const newTask = res.data

            setTasks(prev => [newTask, ...prev])
            setTotalTasks(prev => prev + 1)

            if (status === "Completed") {
                setCompletedTasks(prev => prev + 1)
            } else {
                setPendingTasks(prev => prev + 1)
                if (new Date(dueDate) < new Date()) setOverdueTasks(prev => prev + 1)
            }

            return newTask
        } catch (err) {
            handleValidationError(err);
            throw err;
        }
    }

    // update task
    const updateTask = async (taskToEdit, title, description, priority, status, startDate, completedAt, dueDate, relatedProject) => {
        try {
            const res = await api.put(`/api/tasks/${taskToEdit._id}`, {
                title, description, priority, status, startDate, completedAt, dueDate, relatedProject
            })
            const updatedTask = res.data

            setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t))

            if (taskToEdit.status !== status) {
                if (taskToEdit.status === "Completed") {
                    setCompletedTasks(prev => prev - 1)
                    setPendingTasks(prev => prev + 1)
                } else if (status === "Completed") {
                    setCompletedTasks(prev => prev + 1)
                    setPendingTasks(prev => prev - 1)
                }
            }

            const wasOverdue = taskToEdit.dueDate && new Date(taskToEdit.dueDate) < new Date() && taskToEdit.status !== "Completed"
            const isOverdue = updatedTask.dueDate && new Date(updatedTask.dueDate) < new Date() && updatedTask.status !== "Completed"
            if (wasOverdue && !isOverdue) setOverdueTasks(prev => prev - 1)
            if (!wasOverdue && isOverdue) setOverdueTasks(prev => prev + 1)

            return updatedTask
        } catch (err) {
            handleValidationError(err);
            throw err;
        }
    }

    // delete task
    const deleteTask = async (taskId) => {
        const task = tasks.find(t => t._id === taskId)
        await api.delete(`/api/tasks/${taskId}`)
        setTasks(prev => prev.filter(t => t._id !== taskId))

        setTotalTasks(prev => prev - 1)
        if (task.status === "Completed") {
            setCompletedTasks(prev => prev - 1)
        } else {
            setPendingTasks(prev => prev - 1)
            if (task.dueDate && new Date(task.dueDate) < new Date()) setOverdueTasks(prev => prev - 1)
        }
    }

    // update status/priority
    const updatePriorityStatus = async (task, status, priority) => {
        try {
            const res = await api.patch(`/api/tasks/${task._id}`, {
                status: status || task.status,
                priority: priority || task.priority,
                completedAt: status === "Completed" ? new Date() : null
            })
            const updatedTask = res.data

            setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t))

            if (task.status !== updatedTask.status) {
                if (task.status === "Completed") {
                    setCompletedTasks(prev => prev - 1)
                    setPendingTasks(prev => prev + 1)
                } else if (updatedTask.status === "Completed") {
                    setCompletedTasks(prev => prev + 1)
                    setPendingTasks(prev => prev - 1)
                }
            }

            // overdue adjustment
            const wasOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Completed"
            const isOverdue = updatedTask.dueDate && new Date(updatedTask.dueDate) < new Date() && updatedTask.status !== "Completed"
            if (wasOverdue && !isOverdue) setOverdueTasks(prev => prev - 1)
            if (!wasOverdue && isOverdue) setOverdueTasks(prev => prev + 1)

            return updatedTask
        } catch (err) {
            handleValidationError(err);
            throw err;
        }
    }

    return {
        tasks, loading,
        fetchTasks,
        createTask, updateTask, deleteTask, updatePriorityStatus,
        hasMore, page, setPage, setLimit,
        totalTasks, completedTasks, pendingTasks, overdueTasks,
        errors, setErrors
    }
}
