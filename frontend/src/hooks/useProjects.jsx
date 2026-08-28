import { useCallback, useState } from "react"
import api from "../api/api.js"

export const useProjects = () => {

    const [projects, setProjects] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    //render projects without page reload
    const fetchProjects = useCallback(async (params = {}, pageNum = 1, reset = false) => {
        try {
            setLoading(true)
            const res = await api.get(`/api/projects`, {
                params: { ...params, page: pageNum, limit: limit }
            })

            const hasMoreFlag = res.data.length === limit + 1;
            setHasMore(hasMoreFlag);

            const projectsPage = hasMoreFlag ? res.data.slice(0, limit) : res.data;
            setProjects(prev => reset ? projectsPage : [...prev, ...projectsPage]);
        }
        catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }, [limit])

    const createProject = async (title, description, startDate, endDate, repoURL, techStack, status, liveURL) => {
        const res = await api.post(`/api/projects`,
            {
                title,
                description,
                startDate,
                endDate,
                repoURL,
                techStack,
                status,
                liveURL,
            }
        )
        const newProject = res.data;

        setProjects(prev => [newProject, ...prev]);
        return newProject;

    }

    const updateProject = async (projectToEdit, title, description, startDate, endDate, repoURL, techStack, status, liveURL) => {

        let res;

        if (projectToEdit.status !== "Completed" && status === "Completed") {
            res = await api.put(`/api/projects/${projectToEdit._id}`,
                {
                    title,
                    description,
                    startDate,
                    endDate: Date.now(),
                    repoURL,
                    techStack,
                    status,
                    liveURL
                }
            )
        }
        else if (projectToEdit.status === "Completed" && status !== "Completed") {
            res = await api.put(`/api/projects/${projectToEdit._id}`,
                {
                    title,
                    description,
                    startDate,
                    endDate: null,
                    repoURL,
                    techStack,
                    status,
                    liveURL
                }
            )
        }
        else {
            res = await api.put(`/api/projects/${projectToEdit._id}`,
                {
                    title,
                    description,
                    startDate,
                    endDate,
                    repoURL,
                    techStack,
                    status,
                    liveURL
                }
            )

        }
        const updatedProject = res.data;

        setProjects(prev => prev.map(p => p._id === updatedProject._id ? updatedProject : p));
        return updatedProject;
    }

    const updateStatus = async (project, status) => {
        let res;

        if (status === "Completed") {
            res = await api.put(`/api/projects/${project._id}`,
                {
                    status,
                    endDate: Date.now()
                },
            );
        }

        else if (status !== "Completed") {
            res = await api.put(`/api/projects/${project._id}`,
                {
                    status,
                    endDate: null
                },
            );
        }

        const updatedProject = res.data;

        setProjects(prev => prev.map(p => p._id === updatedProject._id ? updatedProject : p));
        return updatedProject;
    }

    const deleteProject = async (projectId) => {
        await api.delete(`/api/projects/${projectId}`);
        setProjects(prev => prev.filter(p => p._id !== projectId));
    }

    return {
        projects, loading,
        fetchProjects,
        createProject, updateProject, deleteProject, updateStatus,
        page, setPage, setLimit, hasMore
    }
}