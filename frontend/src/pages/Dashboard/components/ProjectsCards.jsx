import { NavLink } from "react-router-dom"

const ProjectsCards = ({ data }) => {
  return (
    <>
      <h2 className="mt-2 px-4 text-xl font-semibold font-poppins">Current Projects</h2>

      {data.projects.length === 0 ?
        (<div className='w-full flex justify-center min-h-45 items-center -translate-y-3'>
          <em className='text-gray-300'>No projects added yet</em>
        </div>)

        :

        (<div className="capitalize h-auto w-full p-1 grid grid-cols-1 sm:grid-cols-2 font-poppins lg:grid-cols-3 max-h-65 overflow-y-auto scrollbar-custom">
          {data.projects.slice(0, 10).map(project => (
            <div className="px-3 py-1 h-28 overflow-y-auto scrollbar-custom bg-[#18181f] m-3 rounded-xl border-2 border-white/10 flex flex-col justify-between" key={project._id}>
              <div className="w-full flex gap-2 items-center mt-2">
                <h3 className="max-w-1/2 whitespace-nowrap truncate text-md font-semibold">{project.title}</h3>
                <span className={`w-2 h-2 rounded-full self-center ${project.status === "In Progress" ? "bg-green-400" : "hidden"}`}></span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ml-auto text-center ${project.status === "Completed" ? "bg-violet-500/30 text-violet-500" : project.status === "In Progress" ? "bg-green-500/40 text-green-500" : "bg-amber-500/40 text-amber-400 border-amber-400"}`} >{project.status}</span>
              </div>

              <div className="flex gap-2 my-2 px-0.5 flex-wrap max-h-6 overflow-hidden">
                {project.techStack.map((tech, idx) => (
                  <span className="text-[10px] min-w-8 text-center bg-gray-500/30 text-gray-400 px-1.5 py-0.5 rounded-full border border-white/50" key={idx}>{tech}</span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[11px] text-gray-400">Updated {" "} {new Date(project.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</span>
                <div className="w-fit gap-4 h-auto flex">
                  {project.repoURL && <NavLink className="flex items-center" target="_blank" to={project.repoURL ? `${project.repoURL}` : "/dashboard"}>
                    <span className="text-xs text-gray-400 hover:text-white/80">Github</span>
                    <i className="text-sm text-gray-400  cursor-pointer ri-github-line hover:text-white/80"></i>
                  </NavLink>}

                  {project.liveURL && <NavLink className="flex items-center" target="_blank" to={project.liveURL ? `${project.liveURL}` : "/dashboard"}>
                    <span className="text-xs text-gray-400 hover:text-white/80">Live</span>
                    <i className="text-sm text-gray-400  cursor-pointer ri-arrow-right-up-line hover:text-white/80"></i>
                  </NavLink>}
                </div>
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
