const ProjectStats = ({ projects }) => {

  const activeProjectsCount = projects.filter(project => (project.status === "Planned") || (project.status === "In Progress")).length
  const completedProjectsCount = projects.filter(project => project.status === "Completed").length

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 w-full h-auto gap-2'>

      <div className='h-auto p-5 m-1 rounded-2xl bg-[#111118] border border-white/15'>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-sm text-gray-400 font-semibold">ACTIVE PROJECTS</h2>
          <i className="ri-folder-open-line text-xl font-normal px-1.5 py-0.5 rounded-xl bg-amber-500/20 text-amber-500"></i>
        </div>

        <h1 className="text-4xl font-bold">{activeProjectsCount}</h1>

      </div>

      <div className='h-auto p-5 m-1 rounded-2xl bg-[#111118] border border-white/15'>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-sm text-gray-400 font-semibold">COMPLETED PROJECTS</h2>
          <i className="ri-folder-check-line text-xl font-normal px-1.5 py-0.5 rounded-xl bg-green-500/20 text-green-500"></i>
        </div>

        <h1 className="text-4xl font-bold">{completedProjectsCount}</h1>

      </div>

      <div className='h-auto p-5 m-1 rounded-2xl bg-[#111118] border border-white/15'>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-sm text-gray-400 font-semibold">TOTAL PROJECTS</h2>
          <i className="ri-folder-chart-line text-xl font-normal px-1.5 py-0.5 rounded-xl bg-violet-600/25 text-violet-600"></i>
        </div>

        <h1 className="text-4xl font-bold">{projects.length}</h1>

      </div>

    </div>
  )
}

export default ProjectStats
