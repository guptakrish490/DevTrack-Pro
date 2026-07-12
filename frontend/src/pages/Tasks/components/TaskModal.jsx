import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TaskModal = ({ mode, modal, setModal, fetchTasks, taskToEdit }) => {

  if (!modal) return null;

  const [projects, setProjects] = useState([])

  // input state for task create/edit modal form
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [startDate, setStartDate] = useState("")
  const [completedAt, setCompletedAt] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [relatedProject, setRelatedProject] = useState(null)

  // prefill modal on edit form
  useEffect(() => {
    if (mode === "edit" && taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setPriority(taskToEdit.priority || "");
      setStartDate(taskToEdit.startDate?.slice(0, 10) || "");
      setCompletedAt(taskToEdit.completedAt?.slice(0, 10) || "");
      setDueDate(taskToEdit.dueDate?.slice(0, 10) || "");
      setRelatedProject(taskToEdit.relatedProject._id || "");
    }

  }, [taskToEdit, mode, modal])

  // fetch projects for relatedProjects dropdown
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects`,
          { withCredentials: true }
        );
        setProjects(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchProjects();
  }, []);

  // handle create/edit modal form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`,
          {
            title,
            description,
            priority,
            startDate,
            completedAt,
            dueDate,
            relatedProject
          },
          { withCredentials: true }
        )

        toast.success("Task created successfully!", {
          autoClose: 2000,
          className: "bg-[#111118] text-green-400 border border-green-600 rounded-lg",
          progressClassName: "bg-green-500"
        });
      }
      else if (mode === "edit") {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${taskToEdit._id}`,
          {
            newTitle: title,
            newDescription: description,
            newPriority: priority,
            newStartDate: startDate,
            newCompletedAt: completedAt,
            newDueDate: dueDate,
            newRelatedProject: relatedProject
          },
          { withCredentials: true }
        )

        toast.info("Task updated!", {
          autoClose: 3000,
          className: "bg-[#18181f] text-blue-400 border border-blue-600 rounded-lg",
          progressClassName: "bg-blue-500"
        });
      }

      fetchTasks();
      cancelModal();

    }

    catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Failed to save Task", {
        autoClose: 4000,
        className: "bg-red-900 text-red-200 border border-red-500 rounded-lg",
        progressClassName: "bg-red-400"
      });
    }
  }

  // closes and resets modal form
  const cancelModal = () => {
    setTitle("");
    setDescription("");
    setPriority("")
    setStartDate("")
    setCompletedAt("")
    setDueDate("")
    setRelatedProject("")

    setModal(false)
  }


  return (
    <div>
      {/* Overlay */}
      <div onClick={cancelModal} className="fixed z-30 inset-0 bg-black/30 backdrop-blur-sm animate-fadeIn"></div>

      {/* Modal box */}
      <form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        className="font-roboto fixed flex flex-col overflow-y-auto max-h-150 scrollbar-custom z-40 max-w-110 sm:w-[90%] w-[85%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111118] rounded-2xl border border-white/20 shadow-lg animate-scaleIn"
      >
        <div className="w-full px-5 py-4 border-b border-white/15 flex items-center">
          <h2 className="font-bold font-stretch-75% text-lg sm:text-xl">{mode === "create" ? "Create Task" : "Edit Task"}</h2>
        </div>

        <div className="flex flex-col flex-1 w-full">

          <div className="w-full flex-2 flex flex-col px-3 py-2 pt-7 justify-end gap-1">
            <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">TITLE</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-[#1d1d24] focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-9 border border-white/15 p-4 rounded-xl"
              placeholder="My Awesome Project"
              type="text" />
          </div>

          <div className="w-full flex-2 flex flex-col px-3 py-2 justify-center gap-1">
            <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">DESCRIPTION</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="bg-[#1d1d24] focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-20 resize-none border border-white/15 px-4 py-3 rounded-xl"
              placeholder="What does this project do?"
              type="text" />
          </div>

          <div className="w-full flex-2 flex gap-4 px-3 py-1 text-sm text-[#6b6b82] font-semibold">

            <div className="flex py-1 flex-col justify-start w-1/2">
              <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">START DATE</span>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="custom-date w-full p-2 border text-white bg-[#1d1d24] border-white/15 rounded-xl focus:outline-none focus:ring focus:ring-violet-500"
                type="date" />
            </div>

            <div className="flex py-1 flex-col justify-start w-1/2">
              <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">END DATE</span>
              <input
                value={completedAt}
                onChange={(e) => setCompletedAt(e.target.value)}
                className="custom-date w-full p-2 border text-white bg-[#1d1d24] border-white/15 rounded-xl focus:outline-none focus:ring focus:ring-violet-500"
                type="date" />
            </div>

          </div>

          <div className="w-full flex-2 flex gap-4 px-3 py-1 text-sm text-[#6b6b82] font-semibold">

            <div className="flex py-1 flex-col justify-start w-1/2">
              <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">PRIORITY</span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border text-white bg-[#1d1d24] border-white/15 rounded-xl focus:outline-none focus:ring focus:ring-violet-500">
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex py-1 flex-col justify-start w-1/2">
              <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">DUE DATE</span>
              <input
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="custom-date w-full p-2 border text-white bg-[#1d1d24] border-white/15 rounded-xl focus:outline-none focus:ring focus:ring-violet-500"
                type="date" />
            </div>

          </div>

          <div className="w-full flex-2 flex flex-col px-3 py-2 justify-end gap-1">
            <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">RELATED PROJECT (if any)</span>
            <select
              value={relatedProject}
              onChange={(e) => setRelatedProject(e.target.value)}
              className="bg-[#1d1d24] focus:outline-none focus:ring-2 focus:ring-violet-500 text-white text-sm mx-1 h-9 border border-white/15 px-3 rounded-xl">
              <option value={null} className="bg-white/20">Related to...</option>
              {projects.map(p => (
                <option
                  value={p._id}
                  key={p._id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>


          <div className="w-full flex-2 flex p-5 mb-2 gap-4 text-sm font-semibold">
            <button
              type="button"
              onClick={cancelModal}
              className="cursor-pointer text-xs sm:text-sm w-full h-8 sm:h-10 px-5 py-1 border border-white/20 rounded-xl bg-[#1b1b28] text-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer text-xs sm:text-sm w-full h-8 sm:h-10 px-5 py-1 border border-white/20 rounded-xl bg-violet-500">
              Save Task
            </button>
          </div>

        </div>

      </form>
    </div>
  )
}

export default TaskModal
