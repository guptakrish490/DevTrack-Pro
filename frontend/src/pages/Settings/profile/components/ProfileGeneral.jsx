const ProfileGeneral = ({ profileData, setModal, setMode }) => {
    return (
        <div className="font-poppins text-[14px] cursor-pointer">

            <div className="my-2">
                <h3 className="text-xl font-bold">General</h3>
                <span className="text-xs text-neutral-100/80">Manage your basic profile information.</span>
            </div>

            <ul className="w-full h-auto border border-neutral-100/20 rounded-2xl flex flex-col">

                {/* Name */}
                <li
                    onClick={() => { setMode("name"); setModal(true); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden transition-colors rounded-t-2xl border-b border-neutral-100/20">
                    <div className="flex gap-2 items-center">
                        <i className="ri-user-3-fill text-neutral-100/60 text-lg"></i>
                        <span>Display Name</span>
                        <span className="text-neutral-100/60 text-sm">{profileData?.name}</span>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

                {/* Bio */}
                <li
                    onClick={() => { setModal(true); setMode("bio"); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden transition-colors border-b border-neutral-100/20">
                    <div className="flex gap-2">
                        <i className="ri-profile-fill text-neutral-100/60 text-lg"></i>
                        <span> Bio</span>
                        <span className="text-neutral-100/60 text-sm">{profileData?.bio}</span>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

                {/* Gender */}
                <li
                    onClick={() => { setModal(true); setMode("gender"); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden transition-colors border-b border-neutral-100/20">
                    <div className="flex gap-2 items-center">
                        <i className="ri-men-line"></i>
                        <span> Gender</span>
                        <span className="text-neutral-100/60 text-sm">{profileData?.gender}</span>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

                {/* Location */}
                <li
                    onClick={() => { setModal(true); setMode("location"); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden transition-colors border-b border-neutral-100/20">
                    <div className="flex gap-2 items-center">
                        <i className="ri-map-pin-fill text-neutral-100/60 text-lg"></i>
                        <span> Location</span>
                        <span className="text-neutral-100/60 text-sm">{profileData?.location}</span>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

                {/* Username */}
                <li
                    onClick={() => { setModal(true); setMode("username"); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden transition-colors border-b border-neutral-100/20">
                    <div className="flex gap-2 items-center">
                        <i className="ri-file-user-fill text-neutral-100/60 text-lg"></i>
                        <span> Username</span>
                        <span className="text-neutral-100/60 text-sm">@{profileData?.username}</span>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

                {/* Email */}
                <li
                    onClick={() => { setModal(true); setMode("email"); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden rounded-b-2xl transition-colors">
                    <div className="flex gap-2 items-center">
                        <i className="ri-mail-fill text-neutral-100/60 text-lg"></i>
                        <span> Email</span>
                        <span className="text-neutral-100/60 text-sm">{profileData?.email}</span>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

            </ul>

        </div>
    )
}

export default ProfileGeneral
