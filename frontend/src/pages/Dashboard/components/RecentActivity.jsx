import React from 'react'

const RecentActivity = ({ data }) => {
    return (
        <div className="w-1/2 p-3 rounded-md h-full backdrop-blur-md bg-white/5 border-2 border-white/15">
            <h3 className="font-semibold text-lg">Recent Activity</h3>
            <hr className="text-gray-500 font-extralight" />

            {data.tasks.length === 0 ?
                <div className='w-full h-full flex justify-center items-center -translate-y-7'>
                    <em className='text-gray-300'>No recent activity yet...</em>
                </div> : (
                    <div className="flex flex-col gap-2 mt-3 px-4">
                        {data.tasks.slice(0, 5).map((task) => (
                            <div className="flex gap-2 text-sm" key={task._id}>
                                <input type="checkbox" />
                                <span>{task.title}</span>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )
}

export default RecentActivity
