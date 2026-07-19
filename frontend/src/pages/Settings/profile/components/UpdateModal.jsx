import axios from "axios";
import { useEffect, useState } from "react";

const UpdateModal = ({ modal, setModal, mode, modalConfig, profileData, formData }) => {


    // add skills into skillset array
    const addSkill = () => {
        const skill = formData?.skillInput.trim();

        if (!skill) return;
        if (formData?.skillSet.includes(skill)) return;

        formData?.setSkillSet([...formData?.skillSet, skill])
        formData?.setSkillInput("")
    }

    // remove skills from skillset array
    const removeSkill = (skillInput) => {
        formData?.setSkillSet(formData?.skillSet.filter(s => s !== skillInput));
    }

    // enter key add the input to skills array
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    }

    // cancel and reset modal with original data when modal closes
    const cancelModal = () => {
        formData?.setName(profileData?.name || "");
        formData?.setBio(profileData?.bio || "");
        formData?.setGender(profileData?.gender || "");
        formData?.setLocation(profileData?.location || "");
        formData?.setUsername(profileData?.username || "");
        formData?.setEmail(profileData?.email || "");
        formData?.setInstituteName(profileData?.others?.instituteName);
        formData?.setSkillSet(profileData.others?.skills || []);
        formData?.setWorkPlace(profileData?.others?.workplace);
        formData?.setRole(profileData?.others?.role);
        formData?.setLinks(profileData?.links || []);

        setModal(false);
    }

    // update existing link handler, (changes the links array state)
    const updateLink = (platform, newURL) => {
        formData?.setLinks(prevLinks =>
            prevLinks.map(link =>
                link.platform === platform ? { ...link, url: newURL } : link
            )
        );
    }

    // handle submission for each edit modal
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/profile`,
                {
                    name: formData?.name,
                    bio: formData?.bio,
                    gender: formData?.gender,
                    Location: formData?.location,
                    username: formData?.username,
                    email: formData?.email,
                    others: {
                        instituteName: formData?.instituteName,
                        skills: formData?.skillSet,
                        workplace: formData?.workplace,
                        role: formData?.role
                    },
                    links: formData?.links
                },
                { withCredentials: true }
            )

            cancelModal();
        }
        catch (err) {
            console.log(err.response?.data || err.message)
        }

    }

    if (!modal) return null;
    return (
        <div>
            {/* overlay */}
            <div onClick={cancelModal} className="fixed z-30 inset-0 bg-black/30 backdrop-blur-sm animate-fadeIn"></div>

            {/* central modal form */}
            <form
                onSubmit={handleSubmit}
                role="dialog"
                aria-modal="true"
                className="font-poppins fixed flex flex-col z-40 max-w-120 sm:w-[90%] w-[85%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111118] rounded-2xl border border-white/10 shadow-lg animate-scaleIn"
            >
                <div className='flex justify-between items-center px-5 py-1.5 sm:py-3 font-bold border-b border-white/10'>
                    <div className="flex gap-1 items-center">
                        <i className="ri-information-line text-blue-500 text-xl"></i>
                        <h1 className='w-full text-sm sm:text-lg '>Update {modalConfig[mode]?.title || `${mode} URL`}</h1>
                    </div>
                    <i onClick={cancelModal} className="ri-close-large-fill cursor-pointer font-normal text-gray-500"></i>
                </div>

                <div className='w-full h-auto flex items-center justify-start px-5 py-3 text-xs sm:text-sm text-gray-500'>
                    <p>{modalConfig[mode]?.description || `Enter your ${mode} profile URL.`}</p>
                </div>

                {/* seperate input types for each field */}
                <div className="w-full h-auto px-5 mb-3">
                    {
                        // input form for name edit
                        mode === "name" ? (
                            <input
                                value={formData?.name}
                                onChange={(e) => formData?.setName(e.target.value)}
                                placeholder={`Enter ${modalConfig[mode]?.title}`}
                                type="text"
                                className="w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />
                        )

                            :

                            // input form for bio edit
                            mode === "bio" ? (
                                <textarea
                                    value={formData?.bio}
                                    onChange={(e) => formData?.setBio(e.target.value)}
                                    placeholder={`Enter ${modalConfig[mode]?.title}`}
                                    type="text"
                                    className="resize-none w-full rounded-lg border h-18 text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />
                            )

                                :

                                // input form for gender edit
                                mode === "gender" ? (
                                    <select
                                        value={formData?.gender}
                                        onChange={(e) => formData?.setGender(e.target.value)}
                                        className="w-full rounded-lg border border-neutral-100/30 text-sm outline-none px-4 py-1.5 appearance-none bg-[#1d1d24]" >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                )

                                    :

                                    // input form for location edit
                                    mode === "location" ? (
                                        <input
                                            value={formData?.location}
                                            onChange={(e) => formData?.setLocation(e.target.value)}
                                            placeholder={`Enter ${modalConfig[mode]?.title}`}
                                            type="text"
                                            className="w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />

                                    )
                                        :

                                        // input form for username edit
                                        mode === "username" ? (
                                            <input
                                                value={formData?.username}
                                                onChange={(e) => formData?.setUsername(e.target.value)}
                                                placeholder={`Enter ${modalConfig[mode]?.title}`}
                                                type="text"
                                                className="w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />
                                        )

                                            :

                                            // input form for email edit
                                            mode === "email" ? (
                                                <input
                                                    value={formData?.email}
                                                    onChange={(e) => formData?.setEmail(e.target.value)}
                                                    placeholder={`Enter ${modalConfig[mode]?.title}`}
                                                    type="email"
                                                    className="w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />
                                            )

                                                :

                                                // input form for institute's name edit
                                                mode === "instituteName" ? (
                                                    <input
                                                        value={formData?.instituteName}
                                                        onChange={(e) => formData?.setInstituteName(e.target.value)}
                                                        placeholder={`Enter ${modalConfig[mode]?.title}`}
                                                        type="text"
                                                        className="w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />
                                                )

                                                    :

                                                    // input form for skills edit
                                                    mode === "skills" ?
                                                        (
                                                            <>
                                                                <div className="flex flex-wrap gap-2 pb-2">
                                                                    {formData?.skillSet?.map(s => (
                                                                        <span key={s} className="text-white/80 w-fit text-sm py-0.5 px-2 text-center flex items-center border rounded-full border-white/60" key={mode}>
                                                                            {s}&nbsp;
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => removeSkill(s)}
                                                                                className="ml-1 text-gray-300 font-extralight hover:text-red-400">
                                                                                ✕
                                                                            </button>
                                                                        </span>
                                                                    ))}

                                                                </div>
                                                                <input
                                                                    value={formData?.skillInput}
                                                                    onKeyDown={handleKeyDown}
                                                                    onChange={(e) => formData?.setSkillInput(e.target.value)}
                                                                    placeholder={`Enter ${modalConfig[mode]?.title}`}
                                                                    type="text"
                                                                    className="w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />
                                                            </>
                                                        )

                                                        :

                                                        // input form for workplace edit
                                                        mode === "workplace" ? (
                                                            <input
                                                                value={formData?.workplace}
                                                                onChange={(e) => formData?.setWorkPlace(e.target.value)}
                                                                placeholder={`Enter ${modalConfig[mode]?.title}`}
                                                                type="text"
                                                                className="w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />
                                                        )

                                                            :

                                                            // input form for role edit
                                                            mode === "role" ? (
                                                                <input
                                                                    value={formData?.role}
                                                                    onChange={(e) => formData?.setRole(e.target.value)}
                                                                    placeholder={`Enter ${modalConfig[mode]?.title}`}
                                                                    type="text"
                                                                    className="w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />
                                                            )

                                                                :

                                                                // input form for github URL edit
                                                                mode === "Github" ? (
                                                                    <input
                                                                        value={formData?.links?.find(link => link.platform === "Github")?.url}
                                                                        onChange={(e) => updateLink("Github", e.target.value)}
                                                                        placeholder={`Enter ${mode} URL`}
                                                                        type="text"
                                                                        className="w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />
                                                                )

                                                                    :

                                                                    // input form for LinkedIn URL edit
                                                                    mode === "LinkedIn" ? (
                                                                        <input
                                                                            value={formData?.links?.find(link => link.platform === "LinkedIn")?.url}
                                                                            onChange={(e) => updateLink("LinkedIn", e.target.value)}
                                                                            placeholder={`Enter ${mode} URL`}
                                                                            type="text"
                                                                            className="w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />
                                                                    )

                                                                        :

                                                                        // input form for edit of other links than Github and LinkedIn
                                                                        (
                                                                            <input
                                                                                value={formData?.links?.find(link => link.platform === mode)?.url}
                                                                                onChange={(e) => updateLink(mode, e.target.value)}
                                                                                placeholder={`Enter ${mode} URL`}
                                                                                type="text"
                                                                                className="w-full rounded-lg border text-sm border-neutral-100/30 outline-none px-4 py-1.5 bg-[#1d1d24]" />
                                                                        )


                    }

                </div>

                <div className='px-5 py-3 w-full flex justify-between gap-4'>

                    <button
                        onClick={cancelModal}
                        type='button'
                        className='cursor-pointer text-xs sm:text-sm w-full h-7 sm:h-10 px-5 py-1 border border-white/20 rounded-xl bg-[#1b1b28] text-gray-500'>
                        Cancel
                    </button>

                    <button
                        className='flex gap-3 justify-center items-center cursor-pointer text-xs sm:text-sm w-full h-7 sm:h-10 px-5 py-1 border border-blue-500/50 rounded-xl bg-[#222751] text-blue-500'>
                        <i className="ri-file-edit-fill"></i>
                        Update
                    </button>

                </div>

            </form>

        </div>
    )
}

export default UpdateModal
