import React from 'react'

const RecentActivity = ({ data }) => {
    return (
        <div className="w-1/2 p-3 rounded-md h-full backdrop-blur-md bg-white/5 border-2 border-white/15">
            <h3 className="font-semibold text-lg">Recent Activity</h3>
            <hr className="text-gray-500 font-extralight" />

            {data.activities.length === 0 ?
                <div className='w-full h-full flex justify-center items-center -translate-y-7'>
                    <em className='text-gray-300'>No recent activity yet...</em>
                </div> : (
                    <div className="flex flex-col gap-3 mt-3 px-2">
                        {data.activities.slice(0, 5).map((activity) => (
                            <div className="flex gap-2 text-xs whitespace-nowrap overflow-hidden" key={activity._id}>
                                <input type="checkbox" />
                                <span className='truncate'>{activity.title}</span>
                            </div>
                        ))}
                        
                    </div>
                )}
        </div>
    )
}

export default RecentActivity
