import { useEffect, useState } from "react"
import ActivityContainer from "./components/ActivityContainer"
import ActivityQueries from "./components/ActivityQueries"
import axios from "axios"

const Activity = () => {

  const [activities, setActivities] = useState([]);
  const [params, setParams] = useState({})

  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/activity`,
        {
          params: params,
          withCredentials: true
        }
      )
      setActivities(res.data)

    }
    catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, [params])

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-4xl font-bold font-poppins mb-2 mx-2">Your Activities⚡</h1>
        <button className="px-3 py-1 font-poppins text-sm text-center items-center gap-1 font-light border bg-red-500/20 text-red-500 rounded-lg ml-auto flex sm:mr-5">
          <i class="ri-delete-bin-2-line text-[15px]"></i>
          <span>Delete All</span>
        </button>
      </div>

      <ActivityQueries
        params={params}
        setParams={setParams} />

      <ActivityContainer
        activities={activities} />
    </>
  )
}

export default Activity
