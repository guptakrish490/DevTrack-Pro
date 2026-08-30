import { useCallback, useState } from "react"
import api from "../api/api.js"

export const useProjects = () => {
    const [projects, setProjects] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(4)
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(false)

    const [totalProjects, setTotalProjects] = useState(0)
    const [completedProjects, setCompletedProjects] = useState(0)
    const [activeProjects, setActiveProjects] = useState(0)
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");

    const handleValidationError = (err) => {
        if (err?.response?.status === 400 && Array.isArray(err.response?.data?.error)) {
            const fieldErrors = {};
            err.response.data.error.forEach((e) => {
                fieldErrors[e.field] = e.message;
            });
            setErrors(fieldErrors);
        }
    };

    // fetch projects with counts
    const fetchProjects = useCallback(async (params = {}, pageNum = 1, reset = false) => {
        try {
            setLoading(true)
            const res = await api.get(`/api/projects`, {
                params: { ...params, page: pageNum, limit }
            })

            setTotalProjects(res.data.totalProjects)
            setCompletedProjects(res.data.completedProjects)
            setActiveProjects(res.data.activeProjects)

            const hasMoreFlag = res.data.projects.length === limit + 1
            setHasMore(hasMoreFlag)

            const projectsPage = hasMoreFlag ? res.data.projects.slice(0, limit) : res.data.projects
            setProjects(prev => reset ? projectsPage : [...prev, ...projectsPage])
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch projects!");
        } finally {
            setLoading(false)
        }
    }, [limit])

    // create project
    const createProject = async (title, description, startDate, endDate, repoURL, techStack, status, liveURL) => {
        try {
            const res = await api.post(`/api/projects`, {
                title, description, startDate, endDate, repoURL, techStack, status, liveURL
            })
            const newProject = res.data

            setProjects(prev => [newProject, ...prev])
            setTotalProjects(prev => prev + 1)

            if (status === "Completed") {
                setCompletedProjects(prev => prev + 1)
            } else {
                setActiveProjects(prev => prev + 1)
            }

            return newProject
        } catch (err) {
            handleValidationError(err);
            throw err;
        }
    }

    // update project
    const updateProject = async (projectToEdit, title, description, startDate, endDate, repoURL, techStack, status, liveURL) => {
        try {
            const res = await api.put(`/api/projects/${projectToEdit._id}`, {
                title, description, startDate, endDate, repoURL, techStack, status, liveURL
            })
            const updatedProject = res.data

            setProjects(prev => prev.map(p => p._id === updatedProject._id ? updatedProject : p))

            if (projectToEdit.status !== status) {
                if (projectToEdit.status === "Completed") {
                    setCompletedProjects(prev => prev - 1)
                    setActiveProjects(prev => prev + 1)
                } else if (status === "Completed") {
                    setCompletedProjects(prev => prev + 1)
                    setActiveProjects(prev => prev - 1)
                }
            }

            return updatedProject
        } catch (err) {
            handleValidationError(err);
            throw err;
        }
    }

    // update status only
    const updateStatus = async (project, status) => {
        try {
            const res = await api.patch(`/api/projects/${project._id}`, {
                status,
                endDate: status === "Completed" ? new Date() : null
            })

            const updatedProject = res.data
            setProjects(prev => prev.map(p => p._id === updatedProject._id ? updatedProject : p))

            if (project.status !== status) {
                if (project.status === "Completed" && status !== "Completed") {
                    setCompletedProjects(prev => prev - 1)
                    setActiveProjects(prev => prev + 1)
                } else if (project.status !== "Completed" && status === "Completed") {
                    setCompletedProjects(prev => prev + 1)
                    setActiveProjects(prev => prev - 1)
                }
            }

            return updatedProject
        } catch (err) {
            handleValidationError(err);
            throw err;
        }
    }

    // delete project
    const deleteProject = async (projectId) => {
        const project = projects.find(p => p._id === projectId)
        await api.delete(`/api/projects/${projectId}`)
        setProjects(prev => prev.filter(p => p._id !== projectId))

        setTotalProjects(prev => prev - 1)
        if (project.status === "Completed") {
            setCompletedProjects(prev => prev - 1)
        } else {
            setActiveProjects(prev => prev - 1)
        }
    }

    return {
        projects, loading,
        fetchProjects,
        createProject, updateProject, deleteProject, updateStatus,
        page, setPage, setLimit, hasMore,
        totalProjects, completedProjects, activeProjects,
        errors, setErrors,
        error, setError
    }
}
