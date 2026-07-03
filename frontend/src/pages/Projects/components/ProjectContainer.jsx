import ProjectQueries from "./ProjectQueries.jsx"
import ProjectCard from "./ProjectCard.jsx"

const ProjectContainer = ({ projects, params, setParams }) => {
  return (
    <div className='font-open-sans w-full h-auto border border-white/15 bg-[#111118] sm:p-5 p-3 rounded-2xl mt-6 '>

      <ProjectQueries
        setParams={setParams} />
      <hr className="my-2 text-white/20" />


      <div className="max-h-120 h-auto w-full grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto scrollbar-custom">
        {projects.map(project => (
          <ProjectCard
            project={project} />
        ))}
      </div>

    </div>


  )
}

export default ProjectContainer
