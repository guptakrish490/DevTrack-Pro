import { NavLink } from "react-router-dom"

const ProgressOverview = ({ data }) => {
    return (

        <div className="h-full p-3 my-3 rounded-2xl bg-[#111118] text-display border-2 border-white/15">
            <div className='flex items-center justify-between px-4'>
                <h3 className="text-xl mt-2 font-Manrope font-extrabold">Progress Overview</h3>
            </div>

            {data.goals.length === 0 ?
                (<div className='w-full h-full min-h-54 flex justify-center items-center -translate-y-7'>
                    <em className='text-gray-300'>No Goals saved yet...</em>
                </div>)

                :

                (<div className="flex flex-col gap-2 justify-between max-h-72 scrollbar-custom px-2 py-5 pb-8 overflow-y-auto">
                    {data.goals.filter(goal => !goal.isCompleted).map((goal) => (
                        <div key={goal._id} className="w-full p-2 text-xs flex flex-col h-1/3 rounded-md">

                            {/* Title + percentage row */}
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-semibold text-sm max-w-[70%] whitespace-nowrap text-ellipsis overflow-hidden">
                                    {goal.title}
                                </p>
                                <span className='text-violet-500 font-semibold text-sm'>{goal.progress}%</span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-linear-to-r from-violet-600 to-blue-400 h-full rounded-full transition-all duration-1000" style={{ width: `${goal.progress}%` }}></div>
                            </div>

                            <span className='font-Manrope text-sm text-gray-400 mt-2 truncate'>{goal.description}</span>

                        </div>
                    ))}
                </div>)
            }

        </div>

    )
}

export default ProgressOverview
