import TaskQueries from "./TaskQueries"
import CreateButton from "../../../components/ui/CreateButton"
import TaskCard from "./TaskCard"

const TaskContainer = ({ tasks, params, setParams }) => {
  return (
    <div className='font-open-sans w-full h-auto border border-white/15 bg-[#111118] sm:p-5 p-3 rounded-2xl mt-6 '>
      <div className="mb-3">
        <TaskQueries
          params={params}
          setParams={setParams} />
      </div>

      <div>
        <CreateButton
          innerText="New Task" />
        <hr className="text-white/18 my-3" />
      </div>

      <div className="flex flex-col h-auto gap-4">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task} />
        ))}
      </div>
    </div>
  )
}

export default TaskContainer
