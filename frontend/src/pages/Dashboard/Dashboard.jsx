import axios from "axios"
import { useEffect, useState } from "react"

const Dashboard = () => {

  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`, { withCredentials: true })
      setData(res.data)
      console.log(res.data)
    }

    fetchDashboard()
  }, [])

  if (!data || data.length === 0) return <p>Loading...</p>

  return (
    <div>
      <h1>Dashboard page</h1>

      <p>Welcome, {data.user?.name}</p>
      <p>Goals: {data.goalCount}</p>
      <p>Projects: {data.projectCount}</p>
      <p>Completed Tasks: {data.completedTaskCount}</p>
      <p>Pending Tasks: {data.pendingTaskCount}</p>

      <h2 className="text-2xl font-bold mt-4">Goals</h2>
      <ul>
        {data.goals?.map((goal, idx) => (
          <li key={idx}>{goal.title}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-4">Projects</h2>
      <ul>
        {data.projects?.map((project, idx) => (
          <li key={idx}>{project.name}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-4">Tasks</h2>
      <ul>
        {data.tasks?.map((task, idx) => (
          <li key={idx}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard
