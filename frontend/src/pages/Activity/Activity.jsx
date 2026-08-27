import { useEffect, useRef, useState } from "react"
import ActivityContainer from "./components/ActivityContainer"
import ActivityQueries from "./components/ActivityQueries"
import ConfirmModal from "./components/ConfirmModal"
import { useActivities } from "../../hooks/useActivity"

const Activity = () => {

  const [params, setParams] = useState({})
  const [deleteModal, setDeleteModal] = useState(false)

  const { activities, fetchActivities, setPage, page, hasMore, setActivities } = useActivities();
  const firstRun = useRef(true);
  // append activities when page changes
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    fetchActivities(params);
  }, [page, params]);

  return (
    <>
      {/* delete confirmation modal */}
      <ConfirmModal
        deleteModal={deleteModal}
        params={params}
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

      {hasMore && (
        <div className="flex items-center justify-center my-8">
          <div className="grow h-px bg-neutral-500/30 backdrop-blur-sm" />
          <button
            onClick={() => setPage(page + 1)}
            className="mx-4 px-6 py-2 text-sm font-medium text-neutral-200  bg-white/10 backdrop-blur-md border border-white/20  rounded-lg shadow-sm hover:bg-white/20 hover:text-white  transition">
            Read more...
          </button>
          <div className="grow h-px bg-neutral-500/30 backdrop-blur-sm" />
        </div>
      )}


    </>
  )
}

export default Activity
