import { useState, useEffect } from "react"

const GoalQueries = ({ setParams }) => {

  // filter options
  const filterOptions = [
    { name: "All", value: "" },
    { name: "Completed", value: true },
    { name: "In Progress", value: false }
  ];

  // states for query handling
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setParams({
      completed: selectedFilter,
      sortBy: sortOrder,
      q: search
    });
  }, [selectedFilter, sortOrder, search, setParams]);

  return (
    <div className="flex flex-col gap-1">
      <div className="w-full flex flex-col sm:flex-row gap-1 sm:gap-2 sm:justify-between sm:items-center">

        <div className="flex flex-wrap gap-2 sm:gap-4 text-sm text-gray-300 items-center">
          <i className="ri-filter-2-line text-xl text-gray-400 sm:mr-3"></i>
          {filterOptions.map(option => (
            <button
              key={option.name}
              onClick={() => setSelectedFilter(option.value)}
              className={`px-2 py-1 rounded-xl border text-xs md:text-md whitespace-nowrap transition-all duration-200 cursor-pointer border-white/15 ${selectedFilter === option.value
                ? "bg-violet-400/25 text-violet-400"
                : "bg-[#1d1d24]"
                }`}
            >
              {option.name}
            </button>
          ))}
        </div>

        <div className="relative sm:w-1/6 sm:max-w-40">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="max-w-75 sm:max-w-full outline-none w-full sm:h-8 h-6 text-sm appearance-none text-gray-400 bg-[#1d1d24] border border-white/20 rounded-xl px-4"
          >
            <option value="" disabled>Sort by</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <span className="text-xs hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            ▼
          </span>
        </div>
        
      </div>

      <div className="flex w-full">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          className="h-7 sm:h-10 text-sm w-full outline-none rounded-xl px-4 bg-[#1d1d24] border-2 border-white/10"
          placeholder="Search Goals..."
        />
      </div>
    </div>
  );
};

export default GoalQueries;
