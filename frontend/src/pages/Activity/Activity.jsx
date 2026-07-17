import { useEffect, useState } from "react"
import ActivityContainer from "./components/ActivityContainer"
import ActivityQueries from "./components/ActivityQueries"
import axios from "axios"
import ConfirmModal from "./components/ConfirmModal"

const Activity = () => {

  const [activities, setActivities] = useState([]);
  const [params, setParams] = useState({})
  const [deleteModal, setDeleteModal] = useState(false)

  // fetch activities from backend to frontend without manual reload
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

  // fetch activities whenever query params are changed or defined
  useEffect(() => {
    fetchActivities();
  }, [params])

  return (
    <>
      {/* delete confirmation modal */}
      <ConfirmModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        fetchActivities={fetchActivities} />

      {/* header (heading and delete button) */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-4xl font-bold font-poppins mb-2 mx-2">Your Activities⚡</h1>
        <button
          onClick={() => setDeleteModal(true)}
          className="px-3 text-nowrap py-1 font-poppins text-[11px] sm:text-sm text-center items-center gap-1 font-light border bg-red-500/20 text-red-500 rounded-lg ml-auto flex sm:mr-5">
          <i className="ri-delete-bin-2-line text-xs sm:text-[15px]"></i>
          <span>Delete All</span>
        </button>
      </div>

      {/* search, sort and filter queries support */}
      <ActivityQueries
        params={params}
        setParams={setParams} />

      {/* contains all activity cards */}
      <ActivityContainer
        activities={activities} />
    </>
  )
}

export default Activity
