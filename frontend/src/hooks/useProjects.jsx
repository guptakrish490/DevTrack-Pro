import { useState } from "react"
import api from "../api/api.js"

export const useProjects = () => {

    const [projects, setProjects] = useState([])

    //render projects without page reload
    const fetchProjects = async (params) => {
        try {
            const res = await api.get(`/api/projects`, {
                params: params
            })

            setProjects(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const createProject = async (title, description, startDate, endDate, repoURL, techStack, status, liveURL) => {
        await api.post(`/api/projects`,
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
    }

    const updateProject = async (projectToEdit, title, description, startDate, endDate, repoURL, techStack, status, liveURL) => {
        if (projectToEdit.status !== "Completed" && status === "Completed") {
            await api.put(`/api/projects/${projectToEdit._id}`,
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
            await api.put(`/api/projects/${projectToEdit._id}`,
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
            await api.put(`/api/projects/${projectToEdit._id}`,
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
    }

    const updateStatus = async (project, status) => {
        if (status === "Completed") {
            await api.put(`/api/projects/${project._id}`,
                {
                    status,
                    endDate: Date.now()
                },
            );
        }

        if (status !== "Completed") {
            await api.put(`/api/projects/${project._id}`,
                {
                    status,
                    endDate: null
                },
            );
        }
    }

    const deleteProject = async (projectToDelete) => {
        await api.delete(`/api/projects/${projectToDelete._id}`)
    }

    return {
        projects, setProjects,
        fetchProjects,
        createProject, updateProject,
        updateStatus,
        deleteProject
    }
}