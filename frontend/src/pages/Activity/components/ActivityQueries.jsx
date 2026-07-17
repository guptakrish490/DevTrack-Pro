import { useEffect, useState } from "react"

const ActivityQueries = ({ params, setParams }) => {

  // states for search, sort and filter queries
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // sets params on every change for each query
  useEffect(() => {
    setParams({
      q: search,
      type: type,
      sortBy: sortOrder
    })
  }, [search, sortOrder, type])

  return (
    <div className='w-full border-y border-neutral-500/20 h-auto flex flex-col items-center py-5 my-2 gap-3'>

      <div className="relative w-full">
        <i className="ri-search-line text-sm sm:text-lg absolute top-1/2 -translate-y-1/2 left-2 text-gray-500"></i>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 sm:h-9 text-sm w-full placeholder:text-[14px] sm:placeholder:text-sm outline-none rounded-lg px-6 sm:px-7 bg-[#16161a] border border-white/20"
          placeholder="Search Activities by Title..."
          type="text" />
      </div>


      <div className='w-full gap-4 grid grid-cols-5'>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="col-span-3 sm:col-span-4 w-full outline-none sm:h-8 h-6 text-[10px] md:text-xs appearance-none text-white bg-[#16161a] border border-white/20 rounded-lg px-3">
          <option value="">All Types</option>
          <option value="goal_created">Goal Created</option>
          <option value="goal_completed">Goal Completed</option>
          <option value="project_created">Project Created</option>
          <option value="project_completed">Project Completed</option>
          <option value="task_created">Task Created</option>
          <option value="task_completed">Task Completed</option>
          <option value="profile_updated">Profile Updated</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="col-span-2 sm:col-span-1 w-full outline-none sm:h-8 h-6 text-[10px] md:text-xs appearance-none text-white bg-[#16161a] border border-white/20 rounded-lg px-3">
          <option value="">Sort By</option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

    </div>
  )
}

export default ActivityQueries
