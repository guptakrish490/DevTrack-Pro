import { NavLink } from "react-router-dom"

const ProjectsCards = ({ data }) => {
  return (
    <>
      <h2 className="text-xl mt-2 px-4 font-Manrope font-extrabold">Current Projects</h2>

      {data.projects.length === 0 ?
        (<div className='w-full flex justify-center min-h-45 items-center -translate-y-3'>
          <em className='text-gray-300'>No projects added yet</em>
        </div>)

        :

        (<div className="h-auto w-full p-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-h-65 overflow-y-auto scrollbar-custom">
          {data.projects.slice(0,10).map(project=>(
            <div className="px-3 py-1 bg-[#18181f] m-2 rounded-xl border-2 border-white/10 flex flex-col justify-between" key={project._id}>
              <div className="w-full flex gap-2 items-center mt-2">
                <h3 className="max-w-1/2 whitespace-nowrap truncate text-md font-semibold">{project.title}</h3>
                <span className={`w-2 h-2 rounded-full self-center ${project.status==="In Progress"?"bg-green-400":"hidden"}`}></span>
                <span className={`text-xs px-2 py-1 rounded-full border ml-auto ${project.status === "Completed" ? "bg-green-500/30 text-green-500 border-green-500" : project.status === "In Progress" ? "bg-blue-600/30 text-blue-600 border-blue-600" : "bg-amber-500/40 text-amber-400 border-amber-400" }`} >{project.status}</span>
              </div>

              <div className="flex gap-2 my-3 px-0.5 flex-wrap">
                {project.techStack.map((tech,idx)=>(
                  <span className="text-xs min-w-8 text-center bg-gray-500/30 text-gray-400 px-1.5 py-0.5 rounded-full border border-white/50" key={idx}>{tech}</span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Updated {" "} {new Date(project.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short"})}</span>
                <NavLink className="flex items-center" target="_blank" to={project.repoURL?`${project.repoURL}`:"/dashboard"}><span className="text-xs text-gray-400">Github</span><i  className="text-sm text-gray-400  cursor-pointer ri-arrow-right-up-line"></i></NavLink>
              </div>
            </div>
          ))}
        </div>
        )
      }
    </>
  )
}

export default ProjectsCards
