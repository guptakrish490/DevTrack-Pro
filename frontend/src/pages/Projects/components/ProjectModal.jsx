import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProjectModal = ({ createProject, updateProject, mode, modal, setModal, projectToEdit, errors, setErrors }) => {

  if (!modal) return null;

  // input states for modal
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [techStack, setTechStack] = useState([])
  const [techInput, setTechInput] = useState("")
  const [status, setStatus] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [repoURL, setRepoURL] = useState("")
  const [liveURL, setLiveURL] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false);

  // escape key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setModal]);

  // prefill form for edit mode
  useEffect(() => {
    setErrors({});
    if (mode === "edit" && projectToEdit) {
      setTitle(projectToEdit.title || "")
      setDescription(projectToEdit.description || "")
      setTechStack(projectToEdit.techStack || [])
      setStatus(projectToEdit.status || "")
      setStartDate(projectToEdit.startDate?.slice(0, 10) || "")
      setEndDate(projectToEdit.endDate?.slice(0, 10) || "")
      setRepoURL(projectToEdit.repoURL || "")
      setLiveURL(projectToEdit.liveURL || "")
    }

    if (mode === "create") {
      setTitle("")
      setDescription("")
      setTechStack([])
      setTechInput("")
      setStatus("")
      setStartDate("")
      setEndDate("")
      setRepoURL("")
      setLiveURL("")
    }
  }, [mode, modal, projectToEdit])

  // close modal and form reset
  const cancelModal = () => {
    setTitle("")
    setDescription("")
    setTechInput("")
    setTechStack([])
    setStatus("")
    setStartDate("")
    setEndDate("")
    setRepoURL("")
    setLiveURL("")

    setErrors({})

    setModal(false)
  }

  // add techstack and store as array
  const addTech = () => {
    const tech = techInput.trim();

    if (!tech) return;
    if (techStack.includes(tech)) return;

    setTechStack([...techStack, tech])
    setTechInput("")
  }

  // remove techstack by closing
  const removeTech = (tech) => {
    setTechStack(techStack.filter(t => t !== tech));
  }

  // press Enter key to add multiple tech stacks
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech();
    }
  }

  // submit functionality handler for create/edit modal
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;

    try {
      setIsSubmitting(true);

      if (mode === "create") {
        result = await createProject(title, description, startDate, endDate, repoURL, techStack, status, liveURL);
        if (!result) throw new Error("Project creation failed!")

        toast.success("Project created successfully!", {
          autoClose: 2000,
          className: "bg-[#111118] text-green-400 border border-green-600 rounded-lg",
          progressClassName: "bg-green-500"
        });
      } else if (mode === "edit") {
        result = await updateProject(projectToEdit, title, description, startDate, endDate, repoURL, techStack, status, liveURL);
        if (!result) throw new Error("Project updation failed!")

        toast.info("Project updated!", {
          autoClose: 3000,
          className: "bg-[#18181f] text-blue-400 border border-blue-600 rounded-lg",
          progressClassName: "bg-blue-500"
        });
      }

      if (result) cancelModal();

    }
    catch (err) {
      toast.error("Failed to save project", {
        autoClose: 4000,
        className: "bg-red-900 text-red-200 border border-red-500 rounded-lg",
        progressClassName: "bg-red-400"
      });
    } finally {
      setIsSubmitting(false);
    }

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
        className="font-roboto fixed flex flex-col overflow-y-auto max-h-170 scrollbar-custom z-40 max-w-110 sm:w-[90%] w-[85%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111118] rounded-2xl border border-white/20 shadow-lg animate-scaleIn"
      >
        <div className="w-full px-5 py-4 border-b border-white/15 flex items-center">
          <h2 className="font-bold font-stretch-75% text-lg sm:text-xl">{mode === "create" ? "Create Project" : "Edit Project"}</h2>
        </div>

        <div className="flex flex-col flex-1 w-full">

          <div className="w-full flex-2 flex flex-col px-3 py-2 pt-7 justify-end gap-1">
            <span className="text-sm text-[#6b6b82] font-semibold">TITLE</span>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setErrors((prev) => ({ ...prev, title: "" }))
              }}
              required
              className={`bg-[#1d1d24] focus:outline-none focus:ring-2 ${!errors.title ? "focus:ring-violet-500" : "focus:ring-red-500"} placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-9 border border-white/15 p-4 rounded-xl`}
              placeholder="My Awesome Project"
              type="text" />
            {errors.title && (
              <p className="text-red-500 text-xs px-2">{errors.title}</p>
            )}
          </div>

          <div className="w-full flex-2 flex flex-col px-3 py-2 justify-center gap-1">
            <span className="text-sm text-[#6b6b82] font-semibold">DESCRIPTION</span>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                setErrors((prev) => ({ ...prev, description: "" }))
              }}
              required
              className={`bg-[#1d1d24] focus:outline-none focus:ring-2 ${!errors.description ? "focus:ring-violet-500" : "focus:ring-red-500"} placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-20 resize-none border border-white/15 px-4 py-3 rounded-xl`}
              placeholder="What does this project do?"
              type="text" />
            {errors.description && (
              <p className="text-red-500 text-xs px-2">{errors.description}</p>
            )}
          </div>

          <div className="w-full flex-2 flex flex-col p-3 justify-end gap-1">
            <span className="text-sm text-[#6b6b82] font-semibold">TECHNOLOGIES (press enter to add more)</span>
            <div className="flex flex-wrap gap-2 px-3">
              {techStack.map(tech => (
                <span className="text-white/80 text-[12px] py-0.5 px-2 text-center flex items-center border rounded-full border-white/60" key={tech}>
                  {tech}&nbsp;
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="ml-1 text-gray-300 font-extralight hover:text-red-400">
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <input
              value={techInput}
              onKeyDown={handleKeyDown}
              onChange={(e) => setTechInput(e.target.value)}
              className={`bg-[#1d1d24] focus:outline-none focus:ring-2 ${!errors.techStack ? "focus:ring-violet-500" : "focus:ring-red-500"} placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-9 border border-white/15 p-4 rounded-xl`}
              placeholder="React, TypeScript, Node.js"
              type="text" />
            {errors.techStack && (
              <p className="text-red-500 text-xs px-2">{errors.techStack}</p>
            )}
          </div>

          <div className="w-full flex-2 flex gap-4 px-3 py-1 text-sm text-[#6b6b82] font-semibold">

            <div className="flex py-1 flex-col justify-start w-1/2">
              <span className="text-sm text-[#6b6b82] font-semibold">START DATE</span>
              <input
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value)
                  setErrors((prev) => ({ ...prev, startDate: "" }))
                }}
                className={`custom-date w-full p-2 border text-[#9d9db1] bg-[#1d1d24] border-white/15 rounded-xl focus:outline-none focus:ring ${!errors.startDate ? "focus:ring-violet-500" : "focus:ring-red-500"}`}
                type="date" />
              {errors.startDate && (
                <p className="text-red-500 text-xs px-2">{errors.startDate}</p>
              )}
            </div>

            <div className="flex py-1 flex-col justify-start w-1/2">
              <span className="text-sm text-[#6b6b82] font-semibold">END DATE</span>
              <input
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value)
                  setErrors((prev) => ({ ...prev, endDate: "" }))
                }}
                className={`custom-date w-full p-2 border text-[#9d9db1] bg-[#1d1d24] border-white/15 rounded-xl focus:outline-none focus:ring ${!errors.endDate ? "focus:ring-violet-500" : "focus:ring-red-500"}`}
                type="date" />
              {errors.endDate && (
                <p className="text-red-500 text-xs px-2 font-normal">{errors.endDate}</p>
              )}
            </div>

          </div>

          <div className="w-full flex-2 flex flex-col px-3 py-2 justify-end gap-1">
            <span className="text-sm text-[#6b6b82] font-semibold">STATUS</span>
            <select
              value={status}
              className={`h-9 text-sm w-full p-2 border text-[#9d9db1] bg-[#1d1d24] border-white/15 rounded-xl focus:outline-none focus:ring ${!errors.status ? "focus:ring-violet-500" : "focus:ring-red-500"}`}
              onChange={(e) => {
                setStatus(e.target.value)
                setErrors((prev) => ({ ...prev, status: "" }))
              }}
              name="status"
              id="status">
              <option value="">Status</option>
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>

            </select>
            {errors.status && (
              <p className="text-red-500 text-xs px-2">{errors.status}</p>
            )}
          </div>

          <div className="w-full flex-2 flex flex-col px-3 py-2 justify-end gap-1">
            <span className="text-sm text-[#6b6b82] font-semibold">REPOSITORY URL</span>
            <input
              value={repoURL}
              onChange={(e) => {
                setRepoURL(e.target.value)
                setErrors((prev) => ({ ...prev, repoURL: "" }))
              }}
              className={`bg-[#1d1d24] focus:outline-none focus:ring-2 ${!errors.repoURL ? "focus:ring-violet-500" : "focus:ring-red-500"} placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-9 border border-white/15 p-4 rounded-xl`}
              placeholder="https://github.com/..."
              type="text" />
            {errors.repoURL && (
              <p className="text-red-500 text-xs px-2">{errors.repoURL}</p>
            )}
          </div>

          <div className="w-full flex-2 flex flex-col px-3 py-2 justify-end gap-1">
            <span className="text-sm text-[#6b6b82] font-semibold">LIVE URL</span>
            <input
              value={liveURL}
              onChange={(e) => {
                setLiveURL(e.target.value)
                setErrors((prev) => ({ ...prev, liveURL: "" }))
              }}
              className={`bg-[#1d1d24] focus:outline-none focus:ring-2 ${!errors.liveURL ? "focus:ring-violet-500" : "focus:ring-red-500"} placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-9 border border-white/15 p-4 rounded-xl`}
              placeholder="https://..."
              type="text" />
            {errors.liveURL && (
              <p className="text-red-500 text-xs px-2">{errors.liveURL}</p>
            )}
          </div>


          <div className="w-full flex-2 flex p-5 gap-4 text-sm font-semibold">
            <button
              type="button"
              onClick={cancelModal}
              className="cursor-pointer text-xs sm:text-sm w-full h-8 sm:h-10 px-5 py-1 border border-white/20 rounded-xl bg-[#1b1b28] text-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer text-xs sm:text-sm w-full h-8 sm:h-10 px-5 py-1 border border-white/20 rounded-xl bg-violet-500">
              {isSubmitting ? "Saving..." : "Save Project"}
            </button>
          </div>

        </div>

      </form>
    </div>
  )
}

export default ProjectModal
