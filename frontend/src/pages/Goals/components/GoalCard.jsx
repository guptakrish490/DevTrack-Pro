import { calculateTimeProgress } from "../../../utils/goals/progress.js"
import { useEffect } from "react";
import axios from "axios";

const GoalCard = ({ goal, fetchGoals, setDeleteModalOpen, setGoalToDelete, handleDelete, setMode, setGoalToEdit, setModal, handleEdit, goalCompleted, setGoalCompleted, handleGoalCompletion }) => {

  const progress = calculateTimeProgress(goal.startDate, goal.endDate, goal.isCompleted)

  const markCompleted = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/goals/${goal._id}`, {
        ...goal,
        isCompleted: true
      }, { withCredentials: true });
      fetchGoals();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  if (progress === 100 && !goal.isCompleted) {
    markCompleted();
  }
}, []);

  return (
    <div className='font-open-sans w-full h-auto p-4 sm:p-5 border rounded-3xl border-white/20 hover:border-purple-800/50 bg-[#18181f]'>

      <div className='flex justify-between sm:items-center flex-col sm:flex-row'>

        <div className='w-full flex sm:items-center gap-1 sm:gap-2 flex-col sm:flex-row'>
          <div className='w-full h-auto flex items-center gap-2 self-start'>
            <input checked={goal.isCompleted} onChange={()=>handleGoalCompletion(goal)} type='checkbox' className='sm:w-4 sm:h-4 w-3 h-3 rounded-full appearance-none checked:border-3 checked:bg-[#5461b1] checked:border-blue-500 border border-white/40' />
            <h4 className={`text-sm sm:text-lg sm:font-medium ${goal.isCompleted ? "line-through text-gray-500" : "text-[#dbe8f0]"}`}>{goal.title}</h4>
          </div>
          <div className='flex gap-8 px-3 sm:px-5 sm:justify-between items-center'>
            
            <span className={`px-1.5 rounded-full text-xs sm:text-sm border border-white/20 ${!goal.isCompleted ? "bg-[#162928] text-green-500" : "bg-[#241e36] text-violet-600"}`}>
              {!goal.isCompleted ? "Active" : "Completed"}
            </span>
            <div className='flex gap-2 sm:gap-4 ml-auto text-sm sm:text-lg sm:mr-0'>
              <button onClick={()=>handleEdit(goal)}><i className="cursor-pointer text-gray-500 ri-pencil-line"></i></button>
              <button onClick={()=>handleDelete(goal)}><i className="cursor-pointer text-gray-500 ri-delete-bin-6-line"></i></button>
            </div>
          </div>
        </div>


      </div>

      <div className="px-2 sm:px-6 text-sm text-[#6b6b82] flex flex-wrap my-2 sm:my-0">
        <span className="truncate whitespace-normal">{goal.description}</span>
      </div>

      <div className="flex justify-between w-full px-2 sm:px-6 py-4 text-xs text-[#6b6b82]">
        <span>End at {new Date(goal.endDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })}</span>
        <span className="text-xs sm:text-sm text-violet-500 font-semibold">{progress}%</span>
      </div>

      <div className="bg-white/20 rounded-full h-1.5 overflow-hidden sm:mx-6 mx-2">
        <div className="bg-linear-to-r from-violet-600 to-blue-400 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} ></div>
      </div>

      <span className='px-2 sm:px-6 my-2 text-xs text-[#6b6b82] flex items-center gap-1'><i className="ri-calendar-line"></i>updated on {goal.updatedAt.split("T")[0]}</span>

    </div>
  )
}

export default GoalCard
