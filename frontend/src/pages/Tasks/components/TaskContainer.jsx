import TaskQueries from "./TaskQueries"
import CreateButton from "../../../components/ui/CreateButton"
import TaskCard from "./TaskCard"

const TaskContainer = ({ tasks, params, setParams, handleCreate, handleEdit, fetchTasks, handleDelete }) => {
  return (
    <div className='font-open-sans w-full h-auto border border-white/15 bg-[#111118] sm:p-5 p-3 rounded-2xl mt-6 '>

      {/* for search, sort and filter query support */}
      <div className="mb-3">
        <TaskQueries
          params={params}
          setParams={setParams} />
      </div>

      {/* creates new tasks */}
      <div>
        <CreateButton
          innerText="New Task"
          onClick={handleCreate} />
        <hr className="text-white/18 my-3" />
      </div>

      <div className="flex flex-col h-auto gap-4">

        {tasks.length === 0 ?
          // empty tasks state container
          (
            <div className="relative h-60">
              <div className="flex flex-col w-full gap-2 justify-center items-center h-auto absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2">
                <i className="ri-calendar-todo-line text-2xl px-3 py-2 rounded-2xl text-gray-400 bg-white/10"></i>
                <h2 className="font-open-sans">No Tasks found</h2>
                <p className="text-center text-sm font-open-sans text-gray-500">Set your first task to get started...</p>
                <CreateButton innerText="Create Task" onClick={handleCreate} />
              </div>
            </div>
          )
          :
          (
            // non-empty tasks state container
            tasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                handleEdit={handleEdit}
                fetchTasks={fetchTasks}
                handleDelete={handleDelete} />
            ))
          )}

      </div>
    </div>
  )
}

export default TaskContainer
