import ProjectStats from "./components/ProjectStats.jsx"
import ProjectContainer from "./components/ProjectContainer.jsx"
import { useState, useEffect } from "react"
import ProjectModal from "./components/ProjectModal.jsx"
import ConfirmModal from "./components/ConfirmModal.jsx"
import { useProjects } from "../../hooks/useProjects.jsx"

const Projects = () => {

  const { projects, fetchProjects, createProject, updateProject, deleteProject, updateStatus, page, setLimit, setPage, hasMore, loading, totalProjects, completedProjects, activeProjects, errors, setErrors } = useProjects();

  const [params, setParams] = useState({})
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState("create")
  const [projectToDelete, setProjectToDelete] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [projectToEdit, setProjectToEdit] = useState(null)


  //re-render projects on sort, search or filter
  useEffect(() => {
    setPage(1);
    fetchProjects(params, 1, true)
  }, [params])

  useEffect(() => {
    if (page > 1) {
      fetchProjects(params, page, false);
    }
  }, [page]);

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
        createProject={createProject}
        updateProject={updateProject}
        mode={mode}
        modal={modal}
        setModal={setModal}
        projectToEdit={projectToEdit}
        errors={errors}
        setErrors={setErrors} />

      <ConfirmModal
        deleteProject={deleteProject}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        projectToDelete={projectToDelete} />

      <h1 className="text-2xl sm:text-4xl font-bold font-display my-3 mx-2">Your Projects 📂</h1>
      <ProjectStats
        totalProjects={totalProjects}
        completedProjects={completedProjects}
        activeProjects={activeProjects} />

      <ProjectContainer
        fetchProjects={fetchProjects}
        projects={projects}
        params={params}
        setParams={setParams}
        setModal={setModal}
        mode={mode}
        updateStatus={updateStatus}
        setMode={setMode}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
        setProjectToDelete={setProjectToDelete}
        handleEdit={handleEdit} />

      {hasMore && (
        <div className="flex items-center justify-center my-8">
          <div className="grow h-px bg-neutral-500/30 backdrop-blur-sm" />
          <button
            disabled={loading}
            onClick={() => setPage(prev => prev + 1)}
            className="mx-4 px-6 py-2 text-sm font-medium text-neutral-200 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm hover:bg-white/20 hover:text-white transition disabled:opacity-50">
            {loading ? "Loading..." : "Read more..."}
          </button>
          <div className="grow h-px bg-neutral-500/30 backdrop-blur-sm" />
        </div>
      )}
    </>
  )
}

export default Projects
