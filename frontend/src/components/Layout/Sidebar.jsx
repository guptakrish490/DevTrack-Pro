import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className='fixed left-0 backdrop-blur-md overflow-x-hidden min-h-screen text-white border-r z-20 border-white/15 shadow-lg hidden md:block flex flex-col justify-center py-6 px-4 h-full max-w-3xs md:w-1/4 '>

      <div>

        <div>
          <ul className='flex flex-col justify-center gap-2 mb-4'>
            <Link to='/dashboard' className='cursor-pointer rounded hover:scale-110 flex gap-2 whitespace-nowrap active:bg-white/5'>
              <i className="text-xl text-zinc-300 ri-dashboard-fill"></i> 
              <span> Dashboard</span>
            </Link>

            <Link to='/goals' className='cursor-pointer rounded hover:scale-110 flex gap-2 whitespace-nowrap active:bg-white/5'>
              <i className="text-xl text-zinc-300 ri-target-line"></i> 
              <span> Goals</span>
            </Link>

            <Link to='/projects' className='cursor-pointer rounded hover:scale-110 flex gap-2 whitespace-nowrap active:bg-white/5'>
              <i className="text-xl text-zinc-300 ri-folder-3-line"></i> 
              <span> Projects</span>
            </Link>
            
            <Link to='/tasks' className='cursor-pointer rounded hover:scale-110 flex gap-2 whitespace-nowrap active:bg-white/5'>
              <i className="text-xl text-zinc-300 ri-calendar-todo-line"></i> 
              <span> Tasks</span>
            </Link>
            
            <Link to='/activity' className='cursor-pointer rounded hover:scale-110 flex gap-2 whitespace-nowrap active:bg-white/5'>
              <i className="text-xl text-zinc-300 ri-line-chart-line"></i> 
              <span> Activity Timeline</span>
            </Link>  
          
          </ul>
        </div>

        <hr />

        <div>
          <ul className='flex flex-col gap-2 mt-4'>
            <Link to='/profile' className='cursor-pointer rounded hover:scale-110 flex gap-2 whitespace-nowrap active:bg-white/5'>
              <i className="text-xl text-zinc-300 ri-user-line"></i> 
              <span> Profile</span>
            </Link>

            <Link target='_blank' to='http://github.com/guptakrish490/DevTrack-Pro' className='cursor-pointer rounded hover:scale-110 flex gap-2 whitespace-nowrap active:bg-white/5'>
              <i className="text-xl text-zinc-300 ri-github-line"></i> 
              <span> Github</span>
            </Link>
          </ul>
        </div>
      </div>
      
    </aside>
  )
}

export default Sidebar
