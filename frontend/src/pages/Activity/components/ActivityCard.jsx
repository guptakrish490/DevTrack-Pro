import dayjs from 'dayjs'

const ActivityCard = ({ a, label }) => {
  return (
    <div
      key={a._id}
      className="font-poppins leading-tight text-[13px] flex justify-center text-white bg-[#111118] border border-neutral-500/30 p-4 rounded-xl flex-col"
    >

      {/* fetch card with matching icon type */}
      <div className='flex items-center gap-2'>
        <i className={`px-1.5 py-1 text-[16px] font-medium rounded-[38%] border-none ${a.type === "goal_created" ? "bg-sky-600/20 text-sky-400 ri-focus-2-line" :
          a.type === "project_created" ? "bg-yellow-600/50 text-yellow-500 ri-folder-3-line" :
            a.type === "task_created" ? "bg-amber-700/60 text-amber-500 ri-todo-line" :
              a.type === "goal_completed" ? "bg-violet-500/30 text-violet-500 ri-trophy-line" :
                a.type === "project_completed" ? "bg-green-400/40 text-green-400 ri-folder-check-line" :
                  a.type === "task_completed" ? "bg-green-500/40 text-green-400 ri-task-line" :
                    a.type === "profile_updated" ? "bg-blue-400/20 text-blue-600 ri-file-edit-line" : ""}`}>
        </i>
        <span>{a.title}</span>
      </div>

      {/* relative time using dayjs */}
      <span className="text-gray-500 text-xs ml-9">
        {label === "TODAY"
          ? a.relativeTime
          : label === "YESTERDAY"
            ? `Yesterday at ${dayjs(a.createdAt).format("h:mm A")}`
            : a.exactTime}
      </span>
    </div>
  )
}

export default ActivityCard
