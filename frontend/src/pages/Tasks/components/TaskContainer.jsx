import TaskQueries from "./TaskQueries"
import CreateButton from "../../../components/ui/CreateButton"
import TaskCard from "./TaskCard"

const TaskContainer = ({ tasks, params, setParams, handleCreate, handleEdit, fetchTasks }) => {
  return (
    <div className='font-open-sans w-full h-auto border border-white/15 bg-[#111118] sm:p-5 p-3 rounded-2xl mt-6 '>
      <div className="mb-3">
        <TaskQueries
          params={params}
          setParams={setParams} />
      </div>

      <div>
        <CreateButton
          innerText="New Task"
          onClick={handleCreate} />
        <hr className="text-white/18 my-3" />
      </div>

      <div className="flex flex-col h-auto gap-4">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            handleEdit={handleEdit}
            fetchTasks={fetchTasks} />
        ))}
      </div>
    </div>
  )
}

export default TaskContainer
