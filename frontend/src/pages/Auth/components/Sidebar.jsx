import logo from "/assets/logo.svg"

const Sidebar = () => {
    return (
        <div className="w-full h-full flex flex-col p-12 font-poppins text-white items-center">

            <div className="flex items-center gap-1.5 justify-start w-full py-8">
                <div className='rounded-[30%] flex items-center h-12 border border-white/5 overflow-hidden shadow-[0_20px_50px_rgba(0,0,205,0.3)]'>
                    <img className="h-full" src={logo} alt="" />
                </div>
                <h3 className="text-xl font-bold font-poppins">DevTrack Pro</h3>
            </div>

            <div className="w-full justify-center gap-4 flex-col flex py-8">
                <h1 className="text-4xl font-poppins font-semibold tracking-[1.05] leading-tight">Ship More <br /> Track Everything.</h1>
                <p className="text-white/70 text-[15px]">The productivity platform built for developers who mean business. Goals, projects, tasks — all in one place.</p>
            </div>

            <div className="py-8 flex items-center w-full">
                <ul className="flex flex-col gap-2 w-full">
                    <li className="flex items-center gap-2">
                        <i className="text-violet-400 ri-target-line px-2 py-1.5 rounded-xl text-sm bg-violet-500/20"></i>
                        <span className="text-sm text-white/70">Track long-term goals with progress metrics</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <i className="text-violet-400 ri-folder-open-line px-2 py-1.5 rounded-xl text-sm bg-violet-500/20"></i>
                        <span className="text-sm text-white/70">Manage your entire project portfolio</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <i className="text-violet-400 ri-todo-line px-2 py-1.5 rounded-xl text-sm bg-violet-500/20"></i>
                        <span className="text-sm text-white/70">Daily task management with priorities</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <i className="text-violet-400 ri-line-chart-line px-2 py-1.5 rounded-xl text-sm bg-violet-500/20"></i>
                        <span className="text-sm text-white/70">Complete activity timeline</span>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Sidebar
