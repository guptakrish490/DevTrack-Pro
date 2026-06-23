const StatsCards = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3 mt-7">
            
            <div className="bg-[#111118] px-5 pb-3 p-1 border border-white/20 rounded-2xl">
                <div className="flex items-center pt-2 justify-between">
                    <span className="text-gray-400 text-sm font-bold font-stretch-extra-condensed whitespace-nowrap">TOTAL GOALS</span>
                    <div className="self-end px-2.5 flex justify-center items-center rounded-[35%] py-1 aspect-square bg-violet-300/20">
                        <i className="font-bold text-xl ri-crosshair-2-line text-violet-600"></i>
                    </div>
                </div>
                <h2 className="py-1 text-4xl font-bold">{data.completedGoalCount+data.pendingGoalCount}</h2>
                    <span className="text-xs text-gray-400">{data.completedGoalCount===0?"None":data.completedGoalCount} completed</span>
            </div>

            <div className="bg-[#111118] px-5 pb-3 p-1 border border-white/20 rounded-2xl">
                <div className="flex items-center pt-2 justify-between">
                    <span className="text-gray-400 text-sm font-bold font-stretch-extra-condensed whitespace-nowrap">PROJECTS</span>
                    <div className="self-end px-2.5 flex justify-center items-center rounded-[35%] py-1 aspect-square bg-sky-500/20">
                        <i className="font-bold text-xl ri-folder-2-line text-sky-400"></i>
                    </div>
                </div>
                <h2 className="py-1 text-4xl font-bold">{data.completedProjectCount+data.pendingProjectCount}</h2>
                <span className="text-xs text-gray-400">{data.pendingProjectCount} active</span>
            </div>

            <div className="bg-[#111118] px-5 pb-3 p-1 border border-white/20 rounded-2xl">
                <div className="flex items-center pt-2 justify-between">
                    <span className="text-gray-400 text-sm font-bold font-stretch-extra-condensed whitespace-nowrap">TASKS</span>
                    <div className="self-end px-2.5 flex justify-center items-center rounded-[35%] py-1 aspect-square bg-green-400/30">
                        <i className="font-bold text-xl ri-file-check-line text-green-500"></i>
                    </div>
                </div>
                <h2 className="py-1 text-4xl font-bold">{data.completedTaskCount+data.pendingTaskCount}</h2>
                <span className="text-xs text-gray-400">{data.completedTaskCount} done</span>
            </div>

            <div className="bg-[#111118] px-5 pb-3 p-1 border border-white/20 rounded-2xl">
                <div className="flex items-center pt-2 justify-between">
                    <span className="text-gray-400 text-sm font-bold font-stretch-extra-condensed whitespace-nowrap">STREAK</span>
                    <div className="self-end px-2.5 flex justify-center items-center rounded-[35%] py-1 aspect-square bg-amber-500/30">
                        <i className="font-bold text-xl ri-fire-line text-amber-500"></i>
                    </div>
                </div>
                <h2 className="py-1 text-4xl font-bold">{data.currentStreaksCount}</h2>
                <span className="text-xs text-gray-400">{data.currentStreaksCount===data.maxStreaksCount?"personal best🔥":"keep going🔥"}</span>
            </div>

        </div>
    )
}

export default StatsCards
