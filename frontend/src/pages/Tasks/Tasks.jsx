import axios from "axios"
import TaskStats from "./components/TaskStats"
import TaskContainer from "./components/TaskContainer"
import ConfirmModal from "./components/ConfirmModal"
import TaskModal from "./components/TaskModal"
import { useState, useEffect } from "react"

const Tasks = () => {

  const [tasks, setTasks] = useState([])
  const [params, setParams] = useState({});
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState("create")
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  // fetch tasks on call without page reload
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          withCredentials: true,
          params: params
        }
      )
      setTasks(res.data)
    }
    catch (err) {
      console.log(err.response?.data || err.message)
    }
  }

  // re-render tasks when search, sort or filter queries are used
  useEffect(() => {
    fetchTasks()
  }, [params])

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
        fetchTasks={fetchTasks} />

      {/* modal for create/edit tasks */}
      <TaskModal
        mode={mode}
        modal={modal}
        setModal={setModal}
        fetchTasks={fetchTasks}
        taskToEdit={taskToEdit} />

      {/* tasks stats cards */}
      <TaskStats
        tasks={tasks} />

      {/* task container (queries and cards) */}
      <TaskContainer
        fetchTasks={fetchTasks}
        tasks={tasks}
        params={params}
        setParams={setParams}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete} />

    </>
  )
}

export default Tasks
