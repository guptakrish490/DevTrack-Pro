import React from 'react'

const ProgressOverview = ({ data }) => {
    return (

        <div className="h-full w-1/2 p-3 rounded-md backdrop-blur-md bg-white/5 border-2 border-white/15">
            <h3 className="text-xl font-semibold">Progress Overview</h3>

            {data.goals.length === 0 ?
                (<div className='w-full h-full flex justify-center items-center -translate-y-7'>
                    <em className='text-gray-300'>No Goals saved yet...</em>
                </div>)

                :

                (<div className="flex flex-wrap h-full mt-2 gap-2 justify-between p-2 pb-8">
                    {data.goals.slice(0, 6).map((goal) => (
                        <div key={goal._id} className="w-[30%] p-2 text-xs flex flex-col h-1/3 border border-white/10 rounded-md">
                            {/* Title + percentage row */}
                            <div className="flex justify-between items-center mb-2">
                                <p className="max-w-[70%] whitespace-nowrap text-ellipsis overflow-hidden">
                                    {goal.title}
                                </p>
                                <span>{goal.progress}%</span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
                                <div className="bg-linear-to-r from-violet-600 to-blue-400 h-full rounded-full transition-all duration-1000" style={{ width: `${goal.progress}%` }}></div>
                            </div>

                        </div>
                    ))}
                </div>)
            }

        </div>

    )
}

export default ProgressOverview
