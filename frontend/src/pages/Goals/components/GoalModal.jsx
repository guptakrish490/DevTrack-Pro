import axios from "axios";
import CreateButton from "../../../components/ui/CreateButton.jsx"
import { useEffect, useState } from "react";

const GoalModal = ({ modal, setModal, onSaved }) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setModal]);

  const cancelModal = () => {
    setModal(false)
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/goals`,
        {
          title,
          description,
          startDate,
          endDate
        },
        { withCredentials: true, })

      setModal(false)
      cancelModal();

      if (onSaved) onSaved();
      console.log(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  if (!modal) return null;

  return (
    <div>
      {/* Overlay */}
      <div onClick={cancelModal} className="fixed z-30 inset-0 bg-black/30 backdrop-blur-sm animate-fadeIn"></div>

      {/* Modal box */}
      <form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        className="font-roboto fixed flex flex-col z-40 max-w-120 sm:w-[90%] w-[85%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111118] rounded-2xl border border-white/20 shadow-lg animate-scaleIn"
      >
        <div className="w-full px-5 py-4 border-b border-white/15 flex items-center">
          <h2 className="font-bold font-stretch-75% text-lg sm:text-xl">Create Goal</h2>
        </div>

        <div className="flex flex-col flex-1 w-full">
          <div className="w-full flex-2 flex flex-col p-3 pt-7 justify-end gap-1">
            <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">TITLE</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-[#1d1d24] focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-9 border border-white/15 p-4 rounded-xl"
              placeholder="Enter short-term or long-term goal"
              type="text" />
          </div>

          <div className="w-full flex-2 flex flex-col p-3 justify-center gap-1">
            <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">DESCRIPTION</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="bg-[#1d1d24] focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-20 resize-none border border-white/15 px-4 py-3 rounded-xl"
              placeholder="Describe what you want to achieve..."
              type="text" />
          </div>
          <div className="w-full flex-2 flex gap-3 text-sm text-[#6b6b82] font-semibold p-5">

            <div className="flex py-1 flex-col justify-start w-1/2">
              <span>START DATE</span>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="custom-date w-full p-2 border bg-[#1d1d24] border-white/15 rounded-xl focus:outline-none focus:ring focus:ring-violet-500"
                type="date" />
            </div>

            <div className="flex py-1 flex-col justify-start w-1/2">
              <span>END DATE</span>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="custom-date w-full p-2 border bg-[#1d1d24] border-white/15 rounded-xl focus:outline-none focus:ring focus:ring-violet-500"
                type="date" />
            </div>

          </div>
          <div className="w-full flex-2 flex p-5 gap-4 text-sm font-semibold">
            <button
              type="button"
              onClick={cancelModal}
              className="cursor-pointer text-xs sm:text-sm w-full h-10 px-5 py-1 border border-white/20 rounded-xl bg-[#1b1b28] text-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer text-xs sm:text-sm w-full h-10 px-5 py-1 border border-white/20 rounded-xl bg-violet-500">
              Save Goal
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default GoalModal
