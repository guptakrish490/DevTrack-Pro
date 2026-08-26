import { useState } from "react"
import api from "../api/api.js"

export const useTasks = () => {

    const [tasks, setTasks] = useState([])

    // fetch tasks on call without page reload
    const fetchTasks = async (params) => {
        try {
            const res = await api.get(`/api/tasks`,
                {
                    params: params
                }
            )
            setTasks(res.data)
        }
        catch (err) {
            console.log(err.response?.data || err.message)
        }
    }

    const createTask = async (title, description, priority, status, startDate, completedAt, dueDate, relatedProject) => {
        await api.post(`/api/tasks`,
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

    const updateTask = async (taskToEdit, title, description, priority, status, startDate, completedAt, dueDate, relatedProject) => {
        if (taskToEdit.status !== "Completed" && status === "Completed") {
            await api.put(`/api/tasks/${taskToEdit._id}`,
                {
                    title,
                    description,
                    priority,
                    status,
                    startDate,
                    completedAt: Date.now(),
                    dueDate,
                    relatedProject
                }
            )
        }
        else if (taskToEdit.status === "Completed" && status !== "Completed") {
            await api.put(`/api/tasks/${taskToEdit._id}`,
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
            await api.put(`/api/tasks/${taskToEdit._id}`,
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
    }

    const deleteTask = async (taskToDelete) => {
        await api.delete(`/api/tasks/${taskToDelete._id}`)
    }

    const updatePriorityStatus = async (task, status, priority) => {
        if (status === "Completed") {
            await api.put(`/api/tasks/${task._id}`,
                {
                    status: status || task.status,
                    priority: priority || task.priority,
                    completedAt: Date.now()
                }
            );
        }
        if (status !== "Completed") {
            await api.put(`/api/tasks/${task._id}`,
                {
                    status: status || task.status,
                    priority: priority || task.priority,
                    completedAt: null
                }
            );
        }
    }

    return {
        tasks,
        fetchTasks,
        createTask, updateTask, deleteTask,
        updatePriorityStatus
    }
}