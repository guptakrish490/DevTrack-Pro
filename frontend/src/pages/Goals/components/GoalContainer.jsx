import GoalQueries from "./GoalQueries.jsx"
import CreateButton from "../../../components/ui/CreateButton.jsx"
import GoalCard from "./GoalCard.jsx"


const GoalContainer = ({ goals, params, setParams, setModal, fetchGoals, setDeleteModalOpen, setGoalToDelete }) => {
  return (
    <div className='font-open-sans w-full h-auto bg-[#111118] rounded-2xl border border-white/15 mt-6 sm:p-5 p-3'>

      <GoalQueries params={params} setParams={setParams} />
      <hr className="mt-2 text-white/20" />

      <div className="w-full flex justify-end p-3">
        <CreateButton setModal={setModal} innerText="New Goal" />
      </div>

      <div className="flex flex-col h-auto">
        {goals.length === 0 ?
          (
            <div className="self-center h-30 translate-y-7">
              <em>No goals added yet...</em>
            </div>
          )

          :

          (
            <div className="w-full h-auto flex flex-col gap-5 ">
              {goals.map(goal => (
                <GoalCard setGoalToDelete={setGoalToDelete} fetchGoals={fetchGoals} setDeleteModalOpen={setDeleteModalOpen} key={goal._id} goal={goal} />
              ))}
            </div>
          )
        }

      </div>

    </div>
  )
}

export default GoalContainer
