import ProjectQueries from "./ProjectQueries.jsx"
import ProjectCard from "./ProjectCard.jsx"
import CreateButton from "../../../components/ui/CreateButton.jsx"


const ProjectContainer = ({ projects, fetchProjects, params, setParams, mode, setMode, modal, setModal, handleCreate, handleDelete, setProjectToDelete, handleEdit}) => {
  return (
    <div className='font-open-sans w-full h-auto border border-white/15 bg-[#111118] sm:p-5 p-3 rounded-2xl mt-6 '>

      <ProjectQueries
        setParams={setParams}
        mode={mode}
        modal={modal}
        setModal={setModal}
        handleCreate={handleCreate} />

      <hr className="my-2 text-white/20" />


      <div className="flex flex-col h-auto">
        {projects.length===0?
        // projects empty-state container
        (
          <div className="relative h-60">
            <div className="flex flex-col w-full gap-2 justify-center items-center h-auto absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2">
              <i className="ri-folder-open-line text-2xl px-3 py-2 rounded-2xl text-gray-400 bg-white/10"></i>
              <h2 className="font-open-sans">No Projects found</h2>
              <p className="text-center text-sm font-open-sans text-gray-500">Set your first project to get started...</p>
              <CreateButton innerText="Create Project" onClick={handleCreate} />
            </div>
          </div>
        )

        :
        // projects non-empty-state container
        (
          <div className="max-h-120 h-auto w-full grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto scrollbar-custom">
            {projects.map(project => (
              <ProjectCard
                fetchProjects={fetchProjects}
                handleDelete={handleDelete}
                setProjectToDelete={setProjectToDelete}
                project={project}
                key={project._id}
                handleEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>
      

    </div>


  )
}

export default ProjectContainer
