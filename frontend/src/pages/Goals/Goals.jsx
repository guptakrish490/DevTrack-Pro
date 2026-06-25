import GoalStats from "./components/GoalStats.jsx"
import GoalContainer from "./components/GoalContainer.jsx"
import GoalCard from "./components/GoalCard.jsx"
import GoalModal from "./components/GoalModal.jsx"
import ConfirmModal from "./components/ConfirmModal.jsx"
import { useEffect, useState } from "react"
import axios from "axios"

const Goals = () => {

  const [goals, setGoals] = useState([])
  const [params, setParams] = useState({});
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState("create")
  const [goalToEdit, setGoalToEdit] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [goalToDelete, setGoalToDelete] = useState(null)
  const [goalCompleted, setGoalCompleted] = useState(false)

  const fetchGoals = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/goals`, {
      withCredentials: true,
      params: params
    })
    setGoals(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    fetchGoals()
  }, [params])

  const handleCreate = () => {
    setMode("create")
    setGoalToEdit(null)
    setModal(true)
  }

  const handleEdit = (goal) => {
    setMode("edit")
    setGoalToEdit(goal)
    setModal(true)
  }

  const handleDelete = (goal) => {
    setGoalToDelete(goal)
    setDeleteModalOpen(true)
  }

  const handleGoalCompletion = async (goal) => {
    try {
      const updated = !goal.isCompleted;
      await axios.put(`${import.meta.env.VITE_API_URL}/api/goals/${goal._id}`, {
        ...goal,
        isCompleted: updated
      }, { withCredentials: true });
      fetchGoals();
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <GoalModal
        mode={mode}
        initialData={goalToEdit}
        modal={modal}
        setModal={setModal}
        onSaved={fetchGoals} />

      <ConfirmModal
        fetchGoals={fetchGoals}
        goalToDelete={goalToDelete}
        deleteModal={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen} />

      <h1 className="text-2xl sm:text-4xl font-bold font-display my-3 mx-2">Goals Overview🎯</h1>
      <GoalStats goals={goals} />

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
        goalCompleted={goalCompleted}
        setGoalCompleted={setGoalCompleted}
        handleGoalCompletion={handleGoalCompletion}
        setModal={setModal} />
    </>
  )
}

export default Goals
