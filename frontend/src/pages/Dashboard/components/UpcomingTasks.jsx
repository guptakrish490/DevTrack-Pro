import React from 'react'

const UpcomingTasks = ({ data }) => {
    return (

        <div className="text-Manrope w-full h-64 flex flex-col p-3 rounded-2xl my-4 bg-[#111118] border-2 border-white/15 ">
            <h3 className="text-xl mt-2 font-Manrope font-extrabold px-3 my-2">Upcoming Tasks</h3>

            {data.tasks.length === 0 ?
                (
                    <div className="w-full h-full flex justify-center items-center -translate-y-3">
                        <em className="text-gray-300">No upcoming tasks yet...</em>
                    </div>
                )

                :

                (
                    <div className="w-full flex flex-col gap-2 overflow-y-auto scrollbar-custom">
                        {data.tasks.map((task) => task.status !== "Completed" && (
                            <div className='w-full h-auto px-4 py-2 flex items-center justify-between gap-3 border-b border-white/10' key={task._id}>
                                <div className='flex items-center gap-2'>
                                    <input className='w-4 h-4 border-2 border-gray-400 rounded-full appearance-none checked:border-3 checked:bg-[#3f4da3] checked:border-blue-500' type="checkbox" />
                                    <div className='flex flex-col'>
                                        <p className='text-sm'>{task.title}</p>
                                        <span className='text-xs text-gray-400'>
                                            {new Date(task.startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <span className={`text-xs px-2 py-0.5 flex items-center rounded-full text-center border ${task.priority === "High" ? "text-red-500 bg-red-500/15" : task.priority === "Medium" ? "text-amber-500 bg-amber-600/15" : "text-green-500 bg-green-500/15"}`} >
                                        <span>{task.priority}</span>
                                    </span>
                                    <span className='text-xs text-gray-400'>
                                        {new Date(task.dueDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "2-digit"
                                        })}
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
        </div>

    )
}

export default UpcomingTasks
