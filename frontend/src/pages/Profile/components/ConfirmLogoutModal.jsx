import { NavLink } from "react-router-dom";
import api from "../../../api/api.js";

const ConfirmLogoutModal = ({logoutModal, setLogoutModal}) => {

    if(!logoutModal) return;

    const handleSubmit = async () => {

        await api.post(`/api/auth/logout`)
        setLogoutModal(false);
    }

    return (
        <div>
            <div onClick={() => setLogoutModal(false)} className="fixed z-30 inset-0 bg-black/30 backdrop-blur-sm animate-fadeIn"></div>

            <form
                role="dialog"
                aria-modal="true"
                className="font-roboto fixed flex flex-col z-40 max-w-90 sm:w-[90%] w-[85%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111118] rounded-2xl border border-white/10 shadow-lg animate-scaleIn"
            >
                <div className='flex justify-between items-center px-5 py-1.5 sm:py-3 font-bold border-b border-white/10'>
                    <h1 className='w-full text-sm sm:text-xl '>Logout</h1>
                    <i className="ri-close-large-fill font-normal text-gray-500"></i>
                </div>

                <div className='w-full h-auto my-1 sm:my-3 flex items-center justify-center px-5 py-3 text-sm text-gray-500'>
                    <p>Are you sure you want to logout?</p>
                </div>

                <div className='px-5 py-3 w-full flex justify-between gap-4'>

                    <button
                        onClick={() => setLogoutModal(false)}
                        type='button'
                        className='cursor-pointer text-xs sm:text-sm w-full h-7 sm:h-10 px-3 py-1 border border-white/20 rounded-xl bg-[#1b1b28] text-gray-500'>
                        Cancel
                    </button>

                    <NavLink
                        to="/"
                        onClick={handleSubmit}
                        className='flex gap-3 justify-center items-center cursor-pointer text-xs sm:text-sm w-full h-7 sm:h-10 px-3 py-1 border border-red-500/50 rounded-xl bg-[#51222b] text-red-500'>
                        <i className="ri-contract-left-line"></i>
                        Confirm
                    </NavLink>

                </div>

            </form>

        </div>
    )
}

export default ConfirmLogoutModal
