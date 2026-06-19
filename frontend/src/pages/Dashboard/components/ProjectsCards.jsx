const ProjectsCards = ({ data }) => {
  return (
    <div className="w-2/3 h-full px-2">
      <h2 className="font-semibold text-xl">Current Projects</h2>

      {data.projects.length === 0 ?
        (<div className='w-full flex justify-center h-[80%] my-1 rounded bg-white/5 border border-white/20 p-3 items-center'>
          <em className='text-gray-300'>No projects added yet</em>
        </div>)

        :

        (<div className="flex w-full h-[90%] gap-3 items-center">

          {data.projects.slice(0, 3).map((project) => (
            <div key={project._id} className="w-1/3 h-[80%] rounded bg-white/10 border border-white/20 flex flex-col p-3 justify-between">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <div>
                <div className="flex px-2 rounded-full flex-wrap mb-1">
                  {project.techStack.map((tech) => (
                    <img
                      key={tech}
                      src={`https://skillicons.dev/icons?i=${tech.toLowerCase()}`}
                      alt={tech}
                      className="w-5 h-5 rounded-full -ml-2 object-fit cursor-pointer"
                    />
                  ))}
                </div>
                <div className="flex flex-col text-xs text-white/80">
                  <span>Started on {project.startDate.split('T')[0]}</span>
                  <span>Last updated on {project.updatedAt.split('T')[0]}</span>
                </div>
              </div>

            </div>
          ))}

        </div>
        )
      }
    </div>
  )
}

export default ProjectsCards
