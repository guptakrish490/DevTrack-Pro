import { NavLink } from 'react-router-dom'
import logo from '../../assets/icons/logo.svg'
import bg from '../../assets/icons/logo.svg'

const Navbar = ({ data }) => (
    <nav className="w-full h-13 md:h-16 border border-white/10 text-white flex items-center px-2 md:px-5 justify-between md:gap-5">

        {/* Search (desktop only) */}
        <div className="relative hidden md:flex flex-1 items-center ml-5">
            <i className="ri-search-line text-gray-400 text-xl absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input placeholder="Search goals, projects, tasks..." className="outline-none pl-10 pr-2 py-1 bg-blue-500/5 w-full max-w-md h-10 border border-white/30 rounded-xl" type="text" /> </div>

        {/* Logo (mobile only) */}
        <div className="flex md:hidden flex-1 items-center gap-3">
            <i className="ri-menu-fill"></i>
            <div className="h-7 w-7 rounded-[35%] overflow-hidden flex justify-center">
                <img className="h-full w-full object-cover border border-white/10" src={logo} alt="logo" />
            </div>
            <h2 className="font-semibold text-xs">DevTrack Pro</h2>
        </div>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2  md:gap-10 my-3">
            <NavLink to="/activity" className="h-full min-w-10 flex justify-center items-center gap-1 px-3 py-1 bg-amber-400/20 rounded-full border-2 border-red-400/20 whitespace-nowrap" >
                <i className="ri-fire-line text-xs md:text-xl text-amber-600"></i>
                <h3 className="text-amber-500 font-medium text-xs md:text-lg">120</h3>
                <span className="text-amber-500 hidden md:flex md:text-sm">day streak</span>
            </NavLink>
            <NavLink to="/profile" className="flex items-center gap-2">
                <i className="ri-notification-4-line text-gray-400 text-md md:text-xl"></i>
                <img className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover" src={data?.user.avatarURL} alt="avatar" />
            </NavLink>
        </div>
    </nav>
)
export default Navbar
