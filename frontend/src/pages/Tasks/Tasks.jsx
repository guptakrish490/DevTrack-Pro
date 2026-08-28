import TaskStats from "./components/TaskStats"
import TaskContainer from "./components/TaskContainer"
import ConfirmModal from "./components/ConfirmModal"
import TaskModal from "./components/TaskModal"
import { useState, useEffect } from "react"
import { useTasks } from "../../hooks/useTasks.jsx"

const Tasks = () => {

  const [params, setParams] = useState({});
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState("create")
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  const { tasks, fetchTasks, createTask, updateTask, updatePriorityStatus, deleteTask, page, setPage, setLimit, hasMore, loading, totalTasks, completedTasks, pendingTasks, overdueTasks } = useTasks();


  // re-render tasks when search, sort or filter queries are used
  useEffect(() => {
    setPage(1);
    fetchTasks(params, 1, true)
  }, [params])

  useEffect(() => {
    if (page > 1) {
      fetchTasks(params, page, false);
    }
  }, [page]);

  // create functionality handler
  const handleCreate = () => {
    setMode("create")
    setModal(true);
  }

  // edit functionality handler
  const handleEdit = (task) => {
    setTaskToEdit(task);
    setMode("edit");
    setModal(true);
  }

  // delete functionality handler
  const handleDelete = (task) => {
    setTaskToDelete(task)
    setDeleteModal(true)
  }

  return (
    <>
      {/* modal for delete confirmation */}
      <ConfirmModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        taskToDelete={taskToDelete}
        deleteTask={deleteTask} />

      {/* modal for create/edit tasks */}
      <TaskModal
        mode={mode}
        modal={modal}
        setModal={setModal}
        createTask={createTask}
        updateTask={updateTask}
        taskToEdit={taskToEdit} />

      {/* tasks stats cards */}
      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
        overdueTasks={overdueTasks} />

      {/* task container (queries and cards) */}
      <TaskContainer
        tasks={tasks}
        params={params}
        setParams={setParams}
        updatePriorityStatus={updatePriorityStatus}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete} />

      {hasMore && (
        <div className="flex items-center justify-center my-8">
          <div className="grow h-px bg-neutral-500/30 backdrop-blur-sm" />
          <button
            disabled={loading}
            onClick={() => setPage(prev => prev + 1)}
            className="mx-4 px-6 py-2 text-sm font-medium text-neutral-200 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm hover:bg-white/20 hover:text-white transition disabled:opacity-50">
            {loading ? "Loading..." : "Read more..."}
          </button>
          <div className="grow h-px bg-neutral-500/30 backdrop-blur-sm" />
        </div>
      )}

    </>
  )
}

export default Tasks
