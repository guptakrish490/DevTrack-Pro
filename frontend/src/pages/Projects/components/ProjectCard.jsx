import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom"



const ProjectCard = ({ project, setProjectToDelete, handleDelete, handleEdit, fetchProjects }) => {

  const [status, setStatus] = useState(project.status)

  const changeStatus = async (project, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/projects/${project._id}`,
        { newStatus },
        { withCredentials: true }
      );
      await fetchProjects();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };



  return (
    <div className="h-auto rounded-2xl flex flex-col justify-between border border-white/20 p-1 bg-[#18181f] font-roboto">

      <div className="w-full flex flex-wrap justify-between items-center px-5 py-4">
        <h1 className="sm:text-xl font-semibold">{project.title.charAt(0).toUpperCase() + project.title.slice(1)}</h1>
        <div className="flex items-center gap-4 text-[15px]">
          <select
            value={status}
            onChange={(e) => {
              const newStatus = e.target.value;
              setStatus(newStatus);
              changeStatus(project, newStatus);
            }}
            className={`outline-none max-w-23 sm:mx-2 px-2 py-1 rounded-full text-[10px] text-nowrap sm:text-xs border ${project.status === "Planned" ? "bg-sky-500/20 text-sky-400" : project.status === "In Progress" ? "bg-green-500/20 text-green-500" : "bg-violet-500/20 text-violet-500"}`}>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <i onClick={() => handleEdit(project)} className="cursor-pointer text-gray-500 ri-pencil-line"></i>
          <i onClick={() => handleDelete(project)} className="cursor-pointer text-gray-500 ri-delete-bin-6-line"></i>
        </div>
      </div>

      <div className="w-full flex flex-col px-5 mb-2 gap-2">
        <div>
          <p className="text-gray-500 text-sm">{project.description.charAt(0).toUpperCase() + project.description.slice(1)}</p>
        </div>
        <div className="text-xs flex flex-wrap gap-3 text-[#85868c]">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-2 py-1 rounded-full border border-[#85868c] bg-[#444850]/40">{tech.charAt(0).toUpperCase() + tech.slice(1)}</span>
          ))}
        </div>

        <div className="flex sm:flex-row flex-col text-xs justify-between w-full font-extralight text-white/50 py-1">
          <span className={`${!project.startDate ? "hidden" : "flex"}`}>
            started on {
              new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date(project.startDate))
            }
          </span>
          <span className={`${!project.endDate ? "hidden" : "flex"}`}>
            ended on {
              new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date(project.endDate))
            }
          </span>
        </div>
      </div>
      <hr className="mx-5 my-2 text-white/10" />

      <div className="w-full flex justify-between px-5 py-3">

        <div>
          <span className="text-gray-400 text-xs">last updated on {
            new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            }).format(new Date(project.updatedAt))
          }</span>
        </div>

        <div className="flex gap-3 items-center text-gray-400 text-sm">
          <span className={`px-2 py-1 rounded-xl bg-gray-400/10 ${project.repoURL ? "flex" : "hidden"}`}>
            <NavLink target="_blank" to={`${project.repoURL}`}><i className={`ri-github-line`}></i></NavLink>
          </span>
          <span className={`px-2 py-1 rounded-xl bg-gray-400/10 ${project.liveURL ? "flex" : "hidden"}`}>
            <NavLink target="_blank" to={`${project.liveURL}`}><i className={`ri-external-link-line`}></i></NavLink>
          </span>
        </div>
      </div>

    </div>
  )
}

export default ProjectCard
