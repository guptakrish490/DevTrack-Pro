import GoalQueries from "./GoalQueries.jsx"
import CreateButton from "../../../components/ui/CreateButton.jsx"
import GoalCard from "./GoalCard.jsx"


const GoalContainer = ({ goals, params, setParams, setModal, fetchGoals, setDeleteModalOpen, setGoalToDelete, handleDelete, setMode, setGoalToEdit, handleCreate, handleEdit, goalCompleted, setGoalCompleted, handleGoalCompletion }) => {
  return (
    <div className='font-open-sans w-full h-auto bg-[#111118] rounded-2xl border border-white/15 mt-6 sm:p-5 p-3'>

      <GoalQueries params={params} setParams={setParams} />
      <hr className="mt-2 text-white/20" />

      <div className="w-full flex justify-end p-3">
        <CreateButton onClick={handleCreate} innerText="New Goal" />
      </div>

      <div className="flex flex-col h-auto">
        {goals.length === 0 ?
          (
            // empty goal state
            <div className="relative h-60">
              <div className="flex flex-col w-full gap-2 justify-center items-center h-auto absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2">
                <i className="ri-focus-2-line text-2xl px-3 py-2 rounded-2xl text-gray-400 bg-white/10"></i>
                <h2 className="font-open-sans">No Goals found</h2>
                <p className="text-center text-sm font-open-sans text-gray-500">Set your first goal to start tracking progress</p>
                <CreateButton innerText="Create Goal" onClick={handleCreate} />
              </div>
            </div>
          )

          :

          (
            // non-empty goals cards
            <div className="w-full h-auto flex flex-col gap-5 ">
              {goals.map(goal => (
                <GoalCard
                  key={goal._id}
                  fetchGoals={fetchGoals}
                  handleDelete={handleDelete}
                  setMode={setMode}
                  setModal={setModal}
                  setDeleteModalOpen={setDeleteModalOpen}
                  setGoalToEdit={setGoalToEdit}
                  setGoalToDelete={setGoalToDelete}
                  handleEdit={handleEdit}
                  goalCompleted={goalCompleted}
                  setGoalCompleted={setGoalCompleted}
                  handleGoalCompletion={handleGoalCompletion}
                  goal={goal} />
              ))}
            </div>
          )
        }

      </div>

    </div>
  )
}

export default GoalContainer
