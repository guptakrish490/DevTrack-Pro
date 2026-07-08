import { useEffect, useState } from "react";

const TaskQueries = ({ params, setParams }) => {

  const filterOptions = [
    { name: "All", value: "" },
    { name: "Planned", value: "Planned" },
    { name: "In Progress", value: "In Progress" },
    { name: "Completed", value: "Completed" }
  ]

  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("")

  useEffect(() => {
    setParams(
      {
        q: search,
        status: status,
        sortBy: sort,
        priority: priority
      }
    )
  }, [search, status, priority, sort, setParams])

  return (
    <div className="w-full h-auto flex flex-col gap-2">
      <div className="relative">
        <i className="ri-search-line text-sm sm:text-lg absolute top-1/2 -translate-y-1/2 left-2 text-gray-500"></i>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-6 sm:h-9 text-sm w-full placeholder:text-xs sm:placeholder:text-sm outline-none rounded-lg px-6 sm:px-7 bg-[#1d1d24] border border-white/20"
          placeholder="Search Tasks..."
          type="text" />
      </div>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full outline-none sm:h-8 h-6 text-[10px] md:text-xs appearance-none text-white bg-[#1d1d24] border border-white/20 rounded-lg px-3">
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-6 flex-wrap text-gray-400">
          {filterOptions.map(option => (
            <button
              onClick={() => setStatus(option.value)}
              key={option.name}
              className={`sm:px-2 sm:py-1 px-1 py-0.5 rounded-xl border text-[8px] md:text-xs whitespace-nowrap transition-all duration-200 cursor-pointer border-white/15 
              ${status === option.value ? "bg-violet-400/25 text-violet-400" : "bg-[#1d1d24]"}`}
            >
              {option.name}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="sm:min-w-30 sm:max-w-full outline-none sm:h-8 h-6 text-[10px] md:text-xs text-gray-500 bg-[#1d1d24] border border-white/20 rounded-full px-3">
          <option value="">Sort By</option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <hr className="text-white/30" />
    </div>
  )
}

export default TaskQueries
