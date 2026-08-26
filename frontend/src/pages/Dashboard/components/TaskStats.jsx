import RadialChart from "./RadialChart.jsx";

const TaskStats = ({ taskCounts }) => {
  const taskCount =
    (taskCounts?.completed ?? 0) +
    (taskCounts?.inProgress ?? 0) +
    (taskCounts?.planned ?? 0);

  return (
    <div className="bg-[#111118] h-full my-3 p-3 rounded-2xl border-2 border-white/15 min-w-0">
      <h2 className="mt-2 px-4 text-xl font-semibold font-poppins">
        Task Status
      </h2>

      {taskCount === 0 ? (
        <div className="h-75 w-full flex items-center justify-center">
          <em className="text-gray-300">
            No tasks added yet...
          </em>
        </div>
      ) : (
        <RadialChart taskCounts={taskCounts} />
      )}
    </div>
  );
};

export default TaskStats;