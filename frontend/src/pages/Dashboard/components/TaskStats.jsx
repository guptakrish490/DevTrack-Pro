import RadialChart from "./RadialChart";

const TaskStats = ({ taskCounts }) => {
  const taskCount = taskCounts.completed + taskCounts.inProgress + taskCounts.planned;

  return (
    <div className="bg-[#111118] h-full my-3 px-2 rounded-2xl p-3 border-2 border-white/15">
      <h2 className="text-xl mt-2 font-Manrope font-extrabold px-4">Task Status</h2>
      <div className="flex w-full h-[85%] gap-3 items-center rounded-md">
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
