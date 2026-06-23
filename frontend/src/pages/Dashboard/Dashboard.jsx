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
    <>
      {/* Welcome box */}
      <Welcome data={data} />

      {/* stats cards */}
      <StatsCards data={data} />

      {/* goals progress and tasks chart */}
      <div className="w-full h-auto my-4 rounded-md p-1 grid lg:grid-rows-1 grid-rows-2 grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-7 col-span-4">
          <ProgressOverview data={data} />
        </div>
        <div className="lg:col-span-3 col-span-4">
          <TaskStats taskCounts={taskCounts} />
        </div>
      </div>


      {/* upcoming tasks and recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full my-4 mt-6">
        <div className="lg:col-span-1">
          <UpcomingTasks data={data} />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity data={data} />
        </div>
      </div>


      {/* projects */}
      <div className="w-full my-4 h-auto px-1 py-4 rounded-2xl bg-[#111118] text-display border-2 border-white/15 ">
        <ProjectsCards data={data} />
      </div>

    </>
  )
}

export default Dashboard
