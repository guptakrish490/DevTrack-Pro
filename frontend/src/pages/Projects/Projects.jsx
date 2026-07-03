import ProjectStats from "./components/ProjectStats.jsx"
import ProjectContainer from "./components/ProjectContainer.jsx"

import { useState, useEffect } from "react"
import axios from "axios"
import ProjectModal from "./components/ProjectModal.jsx"
import ConfirmModal from "./components/ConfirmModal.jsx"

const Projects = () => {

  const [projects, setProjects] = useState([])
  const [params, setParams] = useState({})
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState("create")

  //render projects without page reload
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`, {
        withCredentials: true,
        params: params
      })

      setProjects(res.data)
      console.log(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [params,])

  const handleCreate = () => {
    setMode("create")
    setModal(true)
  }


  return (
    <>
      <ProjectModal
        fetchProjects={fetchProjects}
        mode={mode}
        modal={modal}
        setModal={setModal} />

      <h1 className="text-2xl sm:text-4xl font-bold font-display my-3 mx-2">Your Projects 📂</h1>
      <ProjectStats
        projects={projects} />

      <ProjectContainer
        projects={projects}
        params={params}
        setParams={setParams}
        setModal={setModal}
        mode={mode}
        setMode={setMode}
        handleCreate={handleCreate} />
    </>
  )
}

export default Projects
