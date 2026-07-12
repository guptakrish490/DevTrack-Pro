const TaskStats = ({ tasks }) => {

  // active tasks count
  const activeTaskCount = tasks.filter(
    t => (t.status === "In Progress") || (t.status === "Planned")
  ).length

  // completed tasks count
  const completedTaskCount = tasks.filter(
    t => (t.status === "Completed")
  ).length

  // overdue tasks count
  const overdueTaskCount = tasks.filter(
    t => t.dueDate && new Date(t.dueDate).getTime() < Date.now()
  ).length;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full h-auto gap-2'>

      {/* total tasks count */}
      <div className='h-auto p-5 m-1 rounded-2xl bg-[#111118] border border-white/15'>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-sm text-gray-400 font-semibold">TOTAL TASKS</h2>
          <i className="ri-calendar-todo-line text-xl font-normal px-1.5 py-0.5 rounded-xl bg-violet-600/25 text-violet-600"></i>
        </div>

        <h1 className="text-4xl font-bold">{tasks.length}</h1>

      </div>


      {/* pending tasks count */}
      <div className='h-auto p-5 m-1 rounded-2xl bg-[#111118] border border-white/15'>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-sm text-gray-400 font-semibold">PENDING</h2>
          <i className="ri-time-line text-xl font-normal px-1.5 py-0.5 rounded-xl bg-amber-500/20 text-amber-500"></i>
        </div>

        <h1 className="text-4xl font-bold">{activeTaskCount}</h1>

      </div>

      {/* completed tasks count */}
      <div className='h-auto p-5 m-1 rounded-2xl bg-[#111118] border border-white/15'>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-sm text-gray-400 font-semibold">COMPLETED</h2>
          <i className="ri-file-check-line text-xl font-normal px-1.5 py-0.5 rounded-xl bg-green-500/20 text-green-500"></i>
        </div>

        <h1 className="text-4xl font-bold">{completedTaskCount}</h1>

      </div>

      {/* overdue count */}
      <div className='h-auto p-5 m-1 rounded-2xl bg-[#111118] border border-white/15'>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-sm text-gray-400 font-semibold">OVERDUE</h2>
          <i className="ri-error-warning-line text-xl font-normal px-1.5 py-0.5 rounded-xl bg-sky-500/20 text-sky-500"></i>
        </div>

        <h1 className="text-4xl font-bold">{overdueTaskCount}</h1>

      </div>




    </div>
  )
}

export default TaskStats
