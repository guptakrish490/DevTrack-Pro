import React from 'react'
import { NavLink } from 'react-router-dom'
import bg from '../../assets/icons/logo.svg'

const Sidebar = ({ data }) => {
  console.log(data)
  return (
    <aside className='hidden md:flex flex-col h-full min-w-60 w-[20%] bg-[#090118] border border-white/10 text-white font-display'>

      <div className='w-full h-1/8 flex items-center p-5 justify-start gap-2 '>
        <NavLink to='/dashboard' className='rounded-[30%] flex items-center max-h-12 border border-white/5 overflow-hidden h-full shadow-[0_20px_50px_rgba(0,0,205,0.3)]'>
          <img className="h-full max-h-12" src={bg} alt="" />
        </NavLink>
        <h2 className='font-semibold text-lg'>DevTrack Pro</h2>
      </div>

      <div className='w-full h-6/8 border-b border-white/10 text-white/40 flex flex-col px-4 py-4 gap-1'>
        {/* main menu */}
        <span className='text-xs px-4 h-fit'>MENU</span>

        <ul className="flex flex-col">

          <NavLink to="/dashboard">
            {({ isActive }) => (
              <div className={`w-full px-4 h-12 flex items-center gap-2 rounded-md transition-colors
                ${isActive ? "bg-[#516db1]/15 text-violet-600 font-semibold" : "text-zinc-500 hover:bg-white/5 hover:hover:font-medium hover:hover:text-white"}`}>
                <i className="text-xl ri-dashboard-fill"></i>
                <div className="h-full w-full flex items-center justify-between">
                  <span>Dashboard</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-violet-600" : "hidden"}`}></span>
                </div>
              </div>
            )}
          </NavLink>

          <NavLink to="/goals">
            {({ isActive }) => (
              <div className={`w-full px-4 h-12 flex items-center gap-2 rounded-md transition-colors
                ${isActive ? "bg-[#516db1]/15 text-violet-600 font-semibold" : "text-zinc-500 hover:bg-white/5 hover:font-medium hover:text-white"}`}>
                <i className="text-xl ri-target-line"></i>
                <div className="h-full w-full flex items-center justify-between">
                  <span>Goals</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-violet-600" : "hidden"}`}></span>
                </div>
              </div>
            )}
          </NavLink>

          <NavLink to="/projects">
            {({ isActive }) => (
              <div className={`w-full px-4 h-12 flex items-center gap-2 rounded-md transition-colors
                ${isActive ? "bg-[#516db1]/15 text-violet-600 font-semibold" : "text-zinc-500 hover:bg-white/5 hover:font-medium hover:text-white"}`}>
                <i className="text-xl ri-folder-3-line"></i>
                <div className="h-full w-full flex items-center justify-between">
                  <span>Projects</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-violet-600" : "hidden"}`}></span>
                </div>
              </div>
            )}
          </NavLink>

          <NavLink to="/tasks">
            {({ isActive }) => (
              <div className={`w-full px-4 h-12 flex items-center gap-2 rounded-md transition-colors
                ${isActive ? "bg-[#516db1]/15 text-violet-600 font-semibold" : "text-zinc-500 hover:bg-white/5 hover:font-medium hover:text-white"}`}>
                <i className="text-xl ri-calendar-todo-line"></i>
                <div className="h-full w-full flex items-center justify-between">
                  <span>Tasks</span>
                  <span className={`w-1.5 h-1.5 text-xs flex items-center rounded-full ${isActive ?
                     "bg-violet-600 text-transparent" 
                     : 
                      data?.pendingTaskCount===0?"hidden"
                      :
                     "bg-amber-300/20 justify-center text-amber-500 w-6 h-4 border-2 hover:font-medium border-amber-500"}`}>
                    {data?.pendingTaskCount}
                  </span>
                </div>
              </div>
            )}
          </NavLink>

          <NavLink to="/activity">
            {({ isActive }) => (
              <div className={`w-full px-4 h-12 flex items-center gap-2 rounded-md transition-colors
                ${isActive ? "bg-[#516db1]/15 text-violet-600 font-semibold" : "text-zinc-500 hover:bg-white/5 hover:font-medium hover:text-white"}`}>
                <i className="text-xl ri-line-chart-line"></i>
                <div className="h-full w-full flex items-center justify-between">
                  <span>Activity</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-violet-600" : "hidden"}`}></span>
                </div>
              </div>
            )}
          </NavLink>

          <NavLink to="/profile">
            {({ isActive }) => (
              <div className={`w-full px-4 h-12 flex items-center gap-2 rounded-md transition-colors
                ${isActive ? "bg-[#516db1]/15 text-violet-600 font-semibold" : "text-zinc-500 hover:bg-white/5 hover:font-medium hover:text-white"}`}>
                <i className="text-xl ri-user-line"></i>
                <div className="h-full w-full flex items-center justify-between">
                  <span>Profile</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-violet-600" : "hidden"}`}></span>
                </div>
              </div>
            )}
          </NavLink>

        </ul>

      </div>

      <div className='w-full h-1/8'>
        {/* profile */}
        <NavLink to='/profile' className='p-4 flex items-center h-full gap-3'>
          <img className='rounded-full h-9 w-9 object-cover' src={data?.user.avatarURL} alt="" />
          <div className='flex justify-between w-full items-center'>
            <div className='flex flex-col justify-center'>
              <p className='text-sm'>{data?.user.name}</p>
              <p className='text-xs text-gray-400'>@{data?.user.username}</p>
            </div>
            <span className='h-full flex items-center'>
              <i className=" text-green-300 ri-line-chart-line"></i>
            </span>
          </div>
        </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar
