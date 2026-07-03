import { useEffect, useState } from "react";
import CreateButton from "../../../components/ui/CreateButton.jsx"

const ProjectQueries = ({ setParams, mode, modal, setModal, handleCreate }) => {

  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("")
  const [sortOrder, setSortOrder] = useState("");

  const filterOptions = [
    { name: "All", value: "" },
    { name: "Completed", value: "Completed" },
    { name: "Planned", value: "Planned" },
    { name: "In Progress", value: "In Progress" }
  ]

  useEffect(() => {
    setParams({
      sortBy: sortOrder,
      q: search,
      status: selectedFilter
    })
  }, [sortOrder, search, selectedFilter, setParams])


  return (
    // main box
    <>
      <div className=" flex flex-col-reverse sm:flex-row items-center gap-2 sm:gap-10 w-full">

        {/* search */}
        <div className="w-full sm:w-1/3 flex flex-col sm:flex-row gap-1 sm:gap-2 sm:justify-between sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="h-7 sm:h-9 text-sm w-full placeholder:text-xs outline-none rounded-xl px-4 bg-[#1d1d24] border-2 border-white/10"
            placeholder="Search Projects..."
          />
        </div>

        <div className="flex items-center w-full sm:flex-1 justify-between">

          {/* filters */}
          <div className="flex items-center gap-1 sm:gap-4 flex-wrap text-gray-400">
            {filterOptions.map(option => (
              <button
                onClick={() => setSelectedFilter(option.value)}
                key={option.name}
                className={`sm:px-2 sm:py-1 px-1 py-0.5 rounded-xl border text-[8px] md:text-xs whitespace-nowrap transition-all duration-200 cursor-pointer border-white/15 ${selectedFilter === option.value
                  ? "bg-violet-400/25 text-violet-400"
                  : "bg-[#1d1d24]"
                  }`}
              >
                {option.name}
              </button>
            ))}
          </div>

          {/* sort */}
          <div className="relative min-w-15 sm:w-1/6 sm:max-w-45 ml-auto">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="max-w-75 sm:max-w-full outline-none w-full sm:h-8 h-6 text-[10px] md:text-xs appearance-none text-gray-400 bg-[#1d1d24] border border-white/20 rounded-xl px-3"
            >
              <option value="" disabled>Sort by</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>

            <span className="text-xs hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              ▼
            </span>
          </div>

        </div>

      </div>

      <hr className="text-white/15 my-2" />

      <div className="w-full flex justify-end p-1 sm:p-3">
        <CreateButton
          onClick={handleCreate}
          innerText="New Project" />
      </div>
    </>
  )
}

export default ProjectQueries
