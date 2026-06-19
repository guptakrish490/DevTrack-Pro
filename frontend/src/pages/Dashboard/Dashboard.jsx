import axios from "axios"
import { useEffect, useState } from "react"

import Welcome from "./components/Welcome"
import StatsCards from "./components/StatsCards"
import ProgressOverview from "./components/ProgressOverview"
import UpcomingTasks from "./components/UpcomingTasks"
import RecentActivity from "./components/RecentActivity"
import ProjectsCards from "./components/ProjectsCards"
import TaskStats from "./components/TaskStats"



const Dashboard = () => {

  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`, { withCredentials: true })
      setData(res.data)
    }

    fetchDashboard()
  }, [])

  if (!data || data.length === 0) return <p>Loading...</p>

  const taskCounts = data.tasks.reduce(
    (acc, task) => {
      if (task.status === "Completed") acc.completed++;
      else if (task.status === "In Progress") acc.inProgress++;
      else if (task.status === "Planned") acc.planned++;
      return acc;
    },
    { completed: 0, inProgress: 0, planned: 0 }
  );




  return (
    <main className="p-4 text-white">

      {/* Welcome box */}
      <Welcome data={data} />


      {/* overview cards */}
      <StatsCards data={data} />


      {/* progress and tasks */}
      <div className="w-full h-54  rounded-md mt-5 p-1 flex gap-4">
        <ProgressOverview data={data} />

        <div className="flex gap-4 w-1/2">
          <UpcomingTasks data={data} />
          <RecentActivity data={data} />
        </div>

      </div>


      {/* Projects and donut chart */}
      <div className="w-full h-48 mt-3 flex gap-4 bg-white/5 border border-white/20 rounded-md py-4">

        <ProjectsCards data={data} />
        <TaskStats taskCounts={taskCounts} />

      </div>

    </main>
  )
}

export default Dashboard
