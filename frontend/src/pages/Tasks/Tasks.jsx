import axios from "axios"
import TaskStats from "./components/TaskStats"
import TaskContainer from "./components/TaskContainer"
import ConfirmModal from "./components/ConfirmModal"
import TaskModal from "./components/TaskModal"
import { useState, useEffect } from "react"

const Tasks = () => {

  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`,
        { withCredentials: true }
      )
      setTasks(res.data)
    }
    catch (err) {
      console.log(err.response?.data || err.message)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <>

      {/* <ConfirmModal />
      <TaskModal /> */}
      <TaskStats
        tasks={tasks} />

      <TaskContainer
        tasks={tasks} />

    </>
  )
}

export default Tasks
