import React from 'react'

const RecentActivity = ({ data }) => {
    return (
        <div className="text-Manrope w-full h-64 flex flex-col p-3 rounded-2xl my-4 bg-[#111118] border-2 border-white/15 ">
            <h3 className="text-xl mt-2 font-Manrope font-extrabold px-3 my-2">Recent Activity</h3>

            {data.activities.length === 0 ?
                (<div className="w-full h-full flex justify-center items-center -translate-y-3">
                    <em className="text-gray-300">No recent activities yet...</em>
                </div>)

                : 

                (<div className="w-full flex flex-col gap-0.5 overflow-y-auto scrollbar-custom">
                    {data.activities.slice(0,10).map((activity) => (
                        <div className="w-full h-auto px-4 py-0.5 flex items-center gap-3" key={activity._id}>
                            <div>
                                <i className={`p-1.5 font-medium rounded-xl border-none ${
                                    activity.type==="goal_created"?"bg-sky-600/20 text-sky-400 ri-focus-2-line":
                                    activity.type==="project_created"?"bg-yellow-600/50 text-yellow-500 ri-folder-3-line":
                                    activity.type==="task_created"?"bg-amber-700/60 text-amber-500 ri-todo-line":
                                    activity.type==="goal_completed"?"bg-violet-500/30 text-violet-500 ri-trophy-line":
                                    activity.type==="project_created"?"bg-green-500/40 text-green-400 ri-task-line":
                                    activity.type==="task_completed"?"bg-green-500/40 text-green-400 ri-task-line":
                                    activity.type==="profile_updated"?"bg-blue-400/30 text-blue-600 ri-file-edit-line":""}`}>
                                </i>
                            </div>

                            <div className='flex flex-col'>
                                <p className='text-sm font-medium truncate'>{activity.title}</p>
                                <span className='text-xs text-gray-400'>
                                    {" "} {new Date(activity.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit", })}{" "} at{" "} {new Date(activity.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true, })}
                                </span>
                            </div>
                            
                        </div>
                    ))}
                    <hr className='text-gray-800 mx-5 mt-2' />

                </div>
                )}
        </div>
    )
}

export default RecentActivity
