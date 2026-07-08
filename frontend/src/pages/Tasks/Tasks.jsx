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

  useEffect(() => {
    fetchTasks()
  }, [params])

  const handleCreate = () => {
    setMode("create")
    setModal(true);
  }

  return (
    <>

      {/* <ConfirmModal /> */}
      <TaskModal
        mode={mode}
        modal={modal}
        setModal={setModal}
        fetchTasks={fetchTasks} />
      <TaskStats
        tasks={tasks} />

      <TaskContainer
        tasks={tasks}
        params={params}
        setParams={setParams}
        handleCreate={handleCreate} />

    </>
  )
}

export default Tasks
