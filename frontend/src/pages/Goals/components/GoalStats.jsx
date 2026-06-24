const GoalStats = ({ goals }) => {

  const completedGoalsCount = goals.filter(goal => goal.isCompleted).length
  const activeGoalsCount = goals.filter(goal => !goal.isCompleted).length

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 w-full h-auto gap-2'>
      <div className='h-auto p-5 m-1 rounded-2xl bg-[#111118] border border-white/15'>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-sm text-gray-400 font-semibold">ACTIVE GOALS</h2>
          <i className="ri-focus-2-line text-xl font-normal px-1.5 py-0.5 rounded-xl bg-green-500/20 text-green-500"></i>
        </div>

        <h1 className="text-4xl font-bold">{activeGoalsCount}</h1>

      </div>
      <div className='h-auto p-5 m-1 rounded-2xl bg-[#111118] border border-white/15'>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-sm text-gray-400 font-semibold">COMPLETED GOALS</h2>
          <i className="ri-trophy-line text-xl font-normal px-1.5 py-0.5 rounded-xl bg-violet-500/20 text-violet-500"></i>
        </div>

        <h1 className="text-4xl font-bold">{completedGoalsCount}</h1>

      </div>
      <div className='h-auto p-5 m-1 rounded-2xl bg-[#111118] border border-white/15'>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-sm text-gray-400 font-semibold">TOTAL GOALS</h2>
          <i className="ri-crosshair-2-fill text-xl font-normal px-1.5 py-0.5 rounded-xl bg-amber-500/20 text-amber-500"></i>
        </div>

        <h1 className="text-4xl font-bold">{goals.length}</h1>

      </div>
    </div>
  )
}

export default GoalStats
