import RadialChart from "./RadialChart";

const TaskStats = ({ taskCounts }) => {
  const taskCount = taskCounts.completed + taskCounts.inProgress + taskCounts.planned;

  return (
    <div className="w-1/3 h-full px-2">
      <h2 className="font-semibold text-xl">Task Status</h2>
      <div className="flex w-full h-[85%] gap-3 items-center bg-white/10 border border-white/20 rounded-md">
        {taskCount === 0 ?
          (
            <div className='w-full flex justify-center h-full items-center'>
              <em className='text-gray-300'>No tasks added yet...</em>
            </div>
          )
          :
          (
            <RadialChart taskCounts={taskCounts} />
          )}
      </div>
    </div>
  );
};

export default TaskStats;
