import axios from "axios";
import { useState } from "react";

const SocialProfileModal = ({ socialModal, setSocialModal, links, setLinks }) => {
    if (!socialModal) return null;

    // hides and resets modal when it is closed
    const cancelModal = () => {
        setPlatform("");
        setUrl("");

        setSocialModal(false);
    }

    // states for modal input values
    const [platform, setPlatform] = useState("");
    const [url, setUrl] = useState("");

    // handle submission of form with checking of duplicate profiles for same platformF
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!platform || !url) {
            alert("Please fill both the fields...");
            return;
        }
        try {
            const exists = links.some(link => link.platform === platform);

            const updatedLinks = exists ? links.map(
                link => link.platform === platform ? { ...link, url } : link
            ) : [...links, { platform, url }];

            await axios.put(`${import.meta.env.VITE_API_URL}/profile`,
                { links: updatedLinks },
                { withCredentials: true }
            );

            setLinks(updatedLinks);
            setSocialModal(false)
        }
        catch (err) {
            console.log(err?.response?.data || err.message);
        }
    }

    return (
        <div>
            {/* overlay */}
            <div onClick={cancelModal} className="fixed z-30 inset-0 bg-black/30 backdrop-blur-sm animate-fadeIn"></div>

            <form
                onSubmit={handleSubmit}
                role="dialog"
                aria-modal="true"
                className="font-poppins fixed flex flex-col z-40 max-w-120 sm:w-[90%] w-[85%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111118] rounded-2xl border border-white/10 shadow-lg animate-scaleIn"
            >
                <div className='flex justify-between items-center px-5 py-1.5 sm:py-3 font-bold border-b border-white/10'>
                    <div className="flex gap-1 items-center">
                        <i className="ri-information-line text-blue-500 text-xl"></i>
                        <h1 className='w-full text-sm sm:text-lg '>Add Social Profiles</h1>
                    </div>
                    <i onClick={cancelModal} className="ri-close-large-fill cursor-pointer font-normal text-gray-500"></i>
                </div>

                <div className='w-full h-auto flex flex-col gap-3 items-center justify-start px-5 py-3 text-xs sm:text-sm text-gray-500'>

                    <div className="w-full">
                        <span className="text-sm font-poppins">Platform</span>
                        <input
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            placeholder="Codeforces, Gitlab, etc..."
                            type="text"
                            className="text-white w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />

                    </div>

                    <div className="w-full">
                        <span className="text-sm font-poppins">Profile URL</span>
                        <input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder={`Enter profile URL`}
                            type="text"
                            className="text-white w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />

                    </div>
                </div>

                <div className='px-5 py-3 w-full flex justify-between gap-4'>

                    <button
                        onClick={cancelModal}
                        type='button'
                        className='cursor-pointer text-xs sm:text-sm w-full h-7 sm:h-10 px-5 py-1 border border-white/20 rounded-xl bg-[#1b1b28] text-gray-500'>
                        Cancel
                    </button>

                    <button
                        className='flex gap-1 justify-center items-center cursor-pointer text-xs sm:text-sm w-full h-7 sm:h-10 px-5 py-1 border border-blue-500/50 rounded-xl bg-[#222751] text-blue-500'>
                        <i className="ri-save-line text-[17px]"></i>
                        Save
                    </button>

                </div>

            </form>

        </div>
    )
}

export default SocialProfileModal
