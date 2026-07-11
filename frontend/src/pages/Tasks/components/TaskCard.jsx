import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'

const TaskCard = ({ task, handleEdit, fetchTasks }) => {

    const [status, setStatus] = useState(task.status)
    const [priority, setPriority] = useState(task.priority)
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        setStatus(task.status);
        setPriority(task.priority);
    }, [task])

    const handleChange = async (task, newStatus, newPriority) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
                {
                    newStatus: newStatus || task.status,
                    newPriority: newPriority || task.priority
                },
                { withCredentials: true }
            );
            await fetchTasks();
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };


    return (
        <div className="w-full font-poppins h-auto border rounded-md border-neutral-100/20 sm:p-5 p-4 transition-all duration-300 ease-in-out hover:border-violet-400">

            <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <h3 title={task.title} className="md:text-lg text-sm font-semibold truncate max-w-30 sm:max-w-60 md:max-w-75 overflow-hidden whitespace-nowrap">{task.title}&nbsp;</h3>
                        <i
                            title="Expand"
                            onClick={() => setExpand(!expand)}
                            className={`ri-arrow-down-s-line text-xl text-gray-300 transition-all ${expand ? "rotate-180" : ""}`}></i>
                    </div>
                    <div className="flex gap-4 text-sm sm:text-lg">
                        <i
                            onClick={() => handleEdit(task)}
                            aria-label="edit"
                            title="Edit"
                            className="ri-pencil-line text-neutral-500 cursor-pointer hover:text-gray-300"></i>
                        <i
                            aria-label="delete"
                            title="Delete"
                            className="ri-delete-bin-line text-neutral-500 cursor-pointer hover:text-red-400"></i>
                    </div>
                </div>
                <p className="text-sm text-neutral-300">{task.description}</p>
            </div>

            <div className="flex gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${status === "Planned" ? "bg-gray-500/20 text-gray-400" : status === "In Progress" ? "bg-amber-500/20 text-amber-500" : "bg-violet-500/20 text-violet-500"}`}>
                    {status}
                </span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${priority === "High" ? "bg-red-500/20 text-red-500" : priority === "Medium" ? "bg-yellow-400/20 text-yellow-500" : "bg-green-400/20 text-green-500"}`}>
                    {priority}
                </span>
            </div>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expand ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}`}>
                <hr className="text-white/10 my-2" />

                <div className="text-xs py-2 flex flex-col gap-2">

                    <div className="flex gap-1 items-center text-sm">
                        <p className="font-semibold">Priority:</p>
                        <div className={`w-2 h-2 rounded-full ${priority === "High" ? "bg-red-500" : priority === "Medium" ? "bg-yellow-400" : "bg-green-400"}`}></div>
                        <select
                            value={priority}
                            onChange={(e) => {
                                const newPriority = e.target.value;
                                setPriority(newPriority);
                                handleChange(task, status, newPriority)
                            }}
                            className={`outline-none border max-w-23 px-1 h-5 sm:h-6 py-0.5 rounded-md text-[10px] text-nowrap sm:text-xs bg-gray-500/20 text-gray-400`}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>

                    </div>

                    <div className="flex gap-1 items-center text-sm">
                        <p className="font-semibold">Status:</p>
                        <select
                            value={status}
                            onChange={(e) => {
                                const newStatus = e.target.value;
                                setStatus(newStatus);
                                handleChange(task, newStatus, priority)
                            }}
                            className={`outline-none max-w-23 px-1 h-5 sm:h-6 py-0.5 rounded-full text-[10px] text-nowrap sm:text-xs border ${status === "Planned" ? "bg-gray-500/20 text-gray-400" : status === "In Progress" ? "bg-amber-500/20 text-amber-500" : "bg-violet-500/20 text-violet-500"}`}>
                            <option value="Planned">Planned</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>

                    </div>

                    {task.relatedProject &&
                        <div className="text-sm flex gap-2 my-1">
                            <i className="ri-folder-open-line bg-yellow-500/30 text-yellow-500 px-1 py-0.5 w-fit h-fit rounded-lg"></i>
                            <span>
                                Related to&nbsp;
                                <NavLink className="underline text-gray-400" to="/projects">{task.relatedProject.title}</NavLink>
                                &nbsp;project
                            </span>

                        </div>}

                    <div className="text-xs text-neutral-400">
                        <p>started on {new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }).format(new Date(task.startDate))}</p>

                        {task.completedAt && <p>completed on {new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }).format(new Date(task.completedAt))}</p>}
                        {!task.completedAt && <p>Task not completed yet</p>}
                    </div>

                </div>
            </div>

            <hr className="text-white/10 my-2" />

            <div className="flex flex-col sm:flex-row sm:gap-6 text-xs text-gray-400">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm">
                            <i className="ri-error-warning-line text-sm md:text-[16px]"></i>
                            <span>Due:</span>
                        </div>
                        {task.dueDate &&
                            <p className={` ${(task.dueDate && new Date(task.dueDate).getTime() < Date.now()) ? "text-red-500" : ""}`}>{new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }).format(new Date(task.dueDate))}</p>}
                        {!task.dueDate && <p>No due date</p>}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm">
                            <i className="ri-calendar-line text-sm md:text-[16px]"></i>
                            <span>Created:</span>
                        </div>
                        <p>{new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }).format(new Date(task.createdAt))}</p>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm">
                            <i className="ri-file-edit-line text-sm md:text-[16px]"></i>
                            <span>Updated:</span>
                        </div>
                        <p>{new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }).format(new Date(task.updatedAt))}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TaskCard
