import ProjectStats from "./components/ProjectStats.jsx"
import ProjectContainer from "./components/ProjectContainer.jsx"

import { useState, useEffect } from "react"
import ProjectModal from "./components/ProjectModal.jsx"
import ConfirmModal from "./components/ConfirmModal.jsx"
import api from "../../api/api.js"
import { useProjects } from "../../hooks/useProjects.jsx"

const Projects = () => {

  const { projects, fetchProjects } = useProjects();

  const [params, setParams] = useState({})
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState("create")
  const [projectToDelete, setProjectToDelete] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [projectToEdit, setProjectToEdit] = useState(null)


  //re-render projects on sort, search or filter
  useEffect(() => {
    fetchProjects(params)
  }, [params,])

  // create functionality handler
  const handleCreate = () => {
    setMode("create")
    setModal(true)
  }

  // delete functionality haandler
  const handleDelete = (project) => {
    setProjectToDelete(project)
    setDeleteModal(true)
  }

  // edit functionality handler
  const handleEdit = (project) => {
    setProjectToEdit(project)
    setMode("edit")
    setModal(true)
  }


  return (
    <>
      <ProjectModal
        fetchProjects={fetchProjects}
        mode={mode}
        params={params}
        modal={modal}
        setModal={setModal}
        projectToEdit={projectToEdit} />

      <ConfirmModal
        params={params}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        projectToDelete={projectToDelete}
        fetchProjects={fetchProjects} />

      <h1 className="text-2xl sm:text-4xl font-bold font-display my-3 mx-2">Your Projects 📂</h1>
      <ProjectStats
        projects={projects} />

      <ProjectContainer
        fetchProjects={fetchProjects}
        projects={projects}
        params={params}
        setParams={setParams}
        setModal={setModal}
        mode={mode}
        setMode={setMode}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
        setProjectToDelete={setProjectToDelete}
        handleEdit={handleEdit} />
    </>
  )
}

export default Projects
