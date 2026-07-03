import ProjectStats from "./components/ProjectStats.jsx"
import ProjectContainer from "./components/ProjectContainer.jsx"

import { useState, useEffect } from "react"
import axios from "axios"

const Projects = () => {

  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`, { withCredentials: true })
      setProjects(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])



  return (
    <>
      <h1 className="text-2xl sm:text-4xl font-bold font-display my-3 mx-2">Your Projects 📂</h1>
      <ProjectStats
        projects={projects} />

      <ProjectContainer
        projects={projects} />
    </>
  )
}

export default Projects
