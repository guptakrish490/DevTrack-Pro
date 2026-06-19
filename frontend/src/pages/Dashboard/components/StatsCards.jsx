const StatsCards = ({ data }) => {
    return (
        <div className="flex gap-5 mt-6">
            
            <div className="w-1/5 h-18 sm:h-22 backdrop-blur-md bg-white/10 p-2 border border-white/20 rounded-md">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 whitespace-nowrap">Active Goals</span>
                    <i className="text-xl ri-firefox-browser-fill"></i>
                </div>
                <h2 className="p-2 text-3xl font-bold">{data.goalCount}</h2>
            </div>

            <div className="w-1/5 h-18 sm:h-22 backdrop-blur-md bg-white/10 p-2 border border-white/20 rounded-md">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 whitespace-nowrap">Active Projects</span>
                    <i className="text-xl ri-firefox-browser-fill"></i>
                </div>
                <h2 className="p-2 text-3xl font-bold">{data.projectCount}</h2>
            </div>

            <div className="w-1/5 h-18 sm:h-22 backdrop-blur-md bg-white/10 p-2 border border-white/20 rounded-md">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 whitespace-nowrap">Pending Tasks</span>
                    <i className="text-xl ri-firefox-browser-fill"></i>
                </div>
                <h2 className="p-2 text-3xl font-bold">{data.pendingTaskCount}</h2>
            </div>

            <div className="w-1/5 h-18 sm:h-22 backdrop-blur-md bg-white/10 p-2 border border-white/20 rounded-md">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 whitespace-nowrap">Tasks Completed</span>
                    <i className="text-xl ri-firefox-browser-fill"></i>
                </div>
                <h2 className="p-2 text-3xl font-bold">{data.completedTaskCount}</h2>
            </div>

            <div className="w-1/5 h-18 sm:h-22 backdrop-blur-md bg-white/10 p-2 border border-white/20 rounded-md">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 whitespace-nowrap">Current Streak</span>
                    <i className="text-xl ri-firefox-browser-fill"></i>
                </div>
                <h2 className="p-2 text-3xl font-bold">{data.streaksCount}</h2>
            </div>

        </div>
    )
}

export default StatsCards
