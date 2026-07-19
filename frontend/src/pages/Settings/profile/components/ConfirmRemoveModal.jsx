import axios from "axios";

const ConfirmRemoveModal = ({ setDeleteModal, deleteModal, links, linkToDelete }) => {
    if (!deleteModal) return null;

    // delete a link from profiles section
    const deleteLink = async (linkToDelete) => {
        if (!linkToDelete) return;

        try {
            const updatedLinks = links.filter(l => l.platform !== linkToDelete.platform);

            await axios.put(`${import.meta.env.VITE_API_URL}/profile`,
                { links: updatedLinks },
                { withCredentials: true }
            )
            setDeleteModal(false);
        }
        catch (err) {
            console.log(err.response?.data || err.message);
        }
    }

    return (
        <div>
            {/* overlay */}
            <div onClick={() => setDeleteModal(false)} className="fixed z-30 inset-0 bg-black/30 backdrop-blur-sm animate-fadeIn"></div>

            {/* delete confirmation modal */}
            <form
                onSubmit={(e) => { e.preventDefault(); deleteLink(linkToDelete); }}
                role="dialog"
                aria-modal="true"
                className="font-roboto fixed flex flex-col z-40 max-w-120 sm:w-[90%] w-[85%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111118] rounded-2xl border border-white/10 shadow-lg animate-scaleIn">
                    
                <div className='flex justify-between items-center px-5 py-1.5 sm:py-3 font-bold border-b border-white/10'>
                    <h1 className='w-full text-sm sm:text-xl '>Remove {linkToDelete?.platform} Profile</h1>
                    <i onClick={() => setDeleteModal(false)} className="ri-close-large-fill cursor-pointer font-normal text-gray-500"></i>
                </div>

                <div className='w-full h-auto my-1 sm:my-3 flex items-center justify-center px-5 py-2 text-xs sm:text-sm text-gray-500'>
                    <p>Are you sure to remove {linkToDelete?.platform} profile from social sections? You can always add it back later.</p>
                </div>

                <div className='px-5 py-3 w-full flex justify-between gap-4'>

                    <button
                        onClick={() => setDeleteModal(false)}
                        type='button'
                        className='cursor-pointer text-xs sm:text-sm w-full h-7 sm:h-10 px-5 py-1 border border-white/20 rounded-xl bg-[#1b1b28] text-gray-500'>
                        Cancel
                    </button>

                    <button
                        className='flex gap-3 justify-center items-center cursor-pointer text-xs sm:text-sm w-full h-7 sm:h-10 px-5 py-1 border border-red-500/50 rounded-xl bg-[#51222b] text-red-500'>
                        <i className="ri-delete-bin-6-line"></i>
                        Remove
                    </button>

                </div>

            </form>

        </div>
    )
}

export default ConfirmRemoveModal
