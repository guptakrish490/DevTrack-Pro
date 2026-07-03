import axios from "axios";
import { useState, useEffect } from "react";


const ProjectModal = ({ fetchProjects, mode, modal, setModal }) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [techStack, setTechStack] = useState([])
  const [techInput, setTechInput] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [repoURL, setRepoURL] = useState("")
  const [liveURL, setLiveURL] = useState("")

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setModal]);

  const cancelModal = () => {
    setTitle("")
    setDescription("")
    setTechInput("")
    setTechStack([])
    setStartDate("")
    setEndDate("")
    setRepoURL("")
    setLiveURL("")

    setModal(false)
  }

  const addTech = () => {
    const tech = techInput.trim();

    if (!tech) return;
    if (techStack.includes(tech)) return;

    setTechStack([...techStack, tech])
    setTechInput("")
  }

  const removeTech = (tech) => {
    setTechStack(techStack.filter(t => t !== tech));
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`,
          {
            title,
            description,
            startDate,
            endDate,
            repoURL,
            techStack,
            liveURL,
          },
          { withCredentials: true })
      }

      if (fetchProjects) await fetchProjects();
      cancelModal();

    }
    catch (err) {
      console.log(err.response.data)
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
        className="font-roboto fixed flex flex-col overflow-y-auto max-h-170 scrollbar-custom z-40 max-w-110 sm:w-[90%] w-[85%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111118] rounded-2xl border border-white/20 shadow-lg animate-scaleIn"
      >
        <div className="w-full px-5 py-4 border-b border-white/15 flex items-center">
          <h2 className="font-bold font-stretch-75% text-lg sm:text-xl">{mode === "create" ? "Create Project" : "Edit Project"}</h2>
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

          <div className="w-full flex-2 flex flex-col p-3 justify-end gap-1">
            <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">TECHNOLOGIES (press enter to add more)</span>
            <div className="flex flex-wrap gap-2 px-3">
              {techStack.map(tech => (
                <span className="text-white/80 text-sm py-0.5 px-2 text-center flex items-center border rounded-full border-white/60" key={tech}>
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
              className="bg-[#1d1d24] focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-9 border border-white/15 p-4 rounded-xl"
              placeholder="React, TypeScript, Node.js"
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
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="custom-date w-full p-2 border text-white bg-[#1d1d24] border-white/15 rounded-xl focus:outline-none focus:ring focus:ring-violet-500"
                type="date" />
            </div>

          </div>

          <div className="w-full flex-2 flex flex-col px-3 py-2 justify-end gap-1">
            <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">REPOSITORY URL</span>
            <input
              value={repoURL}
              onChange={(e) => setRepoURL(e.target.value)}
              className="bg-[#1d1d24] focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-9 border border-white/15 p-4 rounded-xl"
              placeholder="https://github.com/..."
              type="text" />
          </div>

          <div className="w-full flex-2 flex flex-col px-3 py-2 justify-end gap-1">
            <span className="text-sm text-[#6b6b82] font-Manrope font-semibold">LIVE URL</span>
            <input
              value={liveURL}
              onChange={(e) => setLiveURL(e.target.value)}
              className="bg-[#1d1d24] focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-[#6f6f8a] placeholder:text-sm mx-1 h-9 border border-white/15 p-4 rounded-xl"
              placeholder="https://..."
              type="text" />
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
              className="cursor-pointer text-xs sm:text-sm w-full h-8 sm:h-10 px-5 py-1 border border-white/20 rounded-xl bg-violet-500">
              Save Project
            </button>
          </div>

        </div>

      </form>
    </div>
  )
}

export default ProjectModal
