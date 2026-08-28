import GoalStats from "./components/GoalStats.jsx"
import GoalContainer from "./components/GoalContainer.jsx"
import GoalModal from "./components/GoalModal.jsx"
import ConfirmModal from "./components/ConfirmModal.jsx"
import { useGoals } from "../../hooks/useGoals.jsx"
import { useEffect, useRef, useState } from "react"

const Goals = () => {

  // states to manage goals page
  const [params, setParams] = useState({})
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState("create")
  const [goalToEdit, setGoalToEdit] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [goalToDelete, setGoalToDelete] = useState(null)


  // create functionality handler
  const handleCreate = () => {
    setMode("create")
    setGoalToEdit(null)
    setModal(true)
  }

  // edit functionality handler
  const handleEdit = (goal) => {
    setMode("edit")
    setGoalToEdit(goal)
    setModal(true)
  }

  // delete functionality handler
  const handleDelete = (goal) => {
    setGoalToDelete(goal)
    setDeleteModalOpen(true)
  }

  const { goals, createGoal, updateGoal, fetchGoals, handleGoalCompletion, deleteGoal, page, setPage, hasMore, loading, totalGoalCount, completedGoalCount, pendingGoalCount, errors, setErrors } = useGoals();

  useEffect(() => {
    setPage(1);
    fetchGoals(params, 1, true);
  }, [params]);

  // 2. Fetch & Append when page > 1 (pagination click)
  useEffect(() => {
    if (page > 1) {
      fetchGoals(params, page, false);
    }
  }, [page]);

  return (
    <>
      <GoalModal
        mode={mode}
        initialData={goalToEdit}
        createGoal={createGoal}
        updateGoal={updateGoal}
        params={params}
        modal={modal}
        setModal={setModal}
        errors={errors}
        setErrors={setErrors} />

      <ConfirmModal
        deleteGoal={deleteGoal}
        goalToDelete={goalToDelete}
        deleteModal={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen} />

      <h1 className="text-2xl sm:text-4xl font-bold font-display my-3 mx-2">Goals Overview🎯</h1>
      <GoalStats
        goals={goals}
        totalGoalCount={totalGoalCount}
        completedGoalCount={completedGoalCount}
        pendingGoalCount={pendingGoalCount} />

      <GoalContainer
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setMode={setMode}
        setGoalToEdit={setGoalToEdit}
        setGoalToDelete={setGoalToDelete}
        setDeleteModalOpen={setDeleteModalOpen}
        fetchGoals={fetchGoals}
        params={params}
        setParams={setParams}
        goals={goals}
        modal={modal}
        handleGoalCompletion={handleGoalCompletion}
        setModal={setModal} />

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

export default Goals
