import logo from '../../assets/icons/logo.svg'

const Navbar = () => {
    return (
        <nav className='backdrop-blur-md text-white border-b fixed top-0 border-white/15 shadow- z-50 2xl h-12 md:h-16 w-screen px-2 md:px-4 flex justify-between items-center'>

            <div className='h-full flex items-center min-w-0'>
                <img className='h-9 w-full md:h-13 lg:h-14' src={logo} alt="" />
            </div>

            <div className='flex items-center justify-end md:justify-around gap-2 min-w-0 max-w-[50%] w-[45%]'>

                <form className='relative hidden sm:block left-0 h-full'>
                    <i className="absolute cursor-pointer hidden sm:block ri-search-line text-base sm:text-lg md:text-xl text-gray-300 left-1 top-1/2 -translate-y-1/2"></i>
                    <input className='hidden sm:block border-2 border-white/20 bg-white/20 px-7 w-auto leading-tight py-1 outline-none rounded-lg text-sm min-w-20' type="text" placeholder="Search..." />
                </form>

                <div className='h-full flex items-center justify-between gap-4 px-1 py-2'>
                    <i className="ri-notification-4-line cursor-pointer text-base sm:text-lg md:text-xl text-gray-300"></i>

                    <div className='h-full flex items-center md:justify-between justify-center'>
                        <img className='sm:h-5 sm:w-5 h-4 w-4 cursor-pointer  rounded-full object-cover' src="https://imgs.search.brave.com/0EdFd40mXtTiZgwOt0O14FojmevaWfqewOHlR-N8Abk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9wZW9wbGVz/LWF2YXRhcnMvZGVm/YXVsdC1hdmF0YXIt/cHJvZmlsZS1waWN0/dXJlLW1hbGUtaWNv/bi5wbmc" alt="" />
                        <i className="ri-arrow-down-s-line cursor-pointer text-base sm:text-lg md:text-xl"></i>

                    </div>
                </div>

            </div>

        </nav>
    )
}

export default Navbar
