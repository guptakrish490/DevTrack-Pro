const ProfileExperience = ({ profileData, setModal, setMode }) => {
    return (
        <div className="font-poppins text-[14px] my-10 cursor-pointer">

            <div className="my-2">
                <h3 className="text-xl font-bold">Experience</h3>
                <span className="text-xs text-neutral-100/80">Share your growth from learning to career.</span>
            </div>

            <ul className="w-full h-auto border border-neutral-100/20 rounded-2xl flex flex-col">

                {/* Institute Name */}
                <li
                    onClick={() => { setModal(true); setMode("instituteName"); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden transition-colors rounded-t-2xl border-b border-neutral-100/20">
                    <div className="flex gap-2 items-center">
                        <i className="ri-building-fill text-neutral-100/60 text-lg"></i>
                        <span>Institute Name</span>
                        <span className="text-neutral-100/60 text-sm">{profileData?.others?.instituteName}</span>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

                {/* skills */}
                <li
                    onClick={() => { setModal(true); setMode("skills"); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden transition-colors border-b border-neutral-100/20">
                    <div className="flex gap-2 items-start">
                        <div className="flex items-center">
                            <i className="ri-tools-fill text-neutral-100/60 text-lg"></i>
                            <span> Skills</span>
                        </div>
                        <div className="text-neutral-100/60 text-sm flex flex-wrap gap-x-3 gap-y-1">
                            {profileData?.others.skills.map(skill => (
                                <span key={skill} className="px-2 py-0.5 rounded-full border border-neutral-100/50 text-purple-50 cursor-default hover:bg-[#1b141e]">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

                {/* Workplace */}
                <li
                    onClick={() => { setModal(true); setMode("workplace"); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden transition-colors border-b border-neutral-100/20">
                    <div className="flex gap-2 items-center">
                        <i className="ri-home-office-fill text-neutral-100/60 text-lg"></i>
                        <span> Workplace</span>
                        <span className="text-neutral-100/60 text-sm">{profileData?.others?.workplace}</span>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

                {/* Role */}
                <li
                    onClick={() => { setModal(true); setMode("role"); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden rounded-b-2xl transition-colors">
                    <div className="flex gap-2 items-center">
                        <i className="ri-briefcase-4-fill text-neutral-100/60 text-lg"></i>
                        <span> Role</span>
                        <span className="text-neutral-100/60 text-sm">{profileData?.others?.role}</span>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

            </ul>

        </div>
    )
}

export default ProfileExperience
