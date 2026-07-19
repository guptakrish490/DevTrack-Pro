import axios from "axios";

const ProfileSocial = ({ profileData, setModal, setMode, setSocialModal, setDeleteModal, setLinkToDelete, setLinks, links, getProfileDetails }) => {

    // github and linkedin url states
    const githubURL = profileData?.links?.find(link => link.platform === "Github")?.url;
    const linkedInURL = profileData?.links?.find(link => link.platform === "LinkedIn")?.url;

    // icons based on platforms
    const platformIcons = {
        github: "ri-github-line",
        leetcode: "ri-code-s-slash-line",
        linkedin: "ri-linkedin-box-fill",
        codeforces: "ri-code-box-line",
        codechef: "ri-restaurant-line"
    }


    return (
        <div className="font-poppins text-[14px] my-10 cursor-pointer">

            <div className="flex justify-between items-center pr-7">
                <div className="my-2">
                    <h3 className="text-xl font-bold">Social</h3>
                    <span className="text-xs text-neutral-100/80">All your connectivity in one place.</span>
                </div>
                <button
                    onClick={() => setSocialModal(true)}
                    className="flex gap-1 items-center px-3 py-1 border border-neutral-100/30 rounded-md active:bg-[#1d1d24]">
                    <i className="ri-add-large-line font-bold"></i>
                    <span>Add More</span>
                </button>
            </div>

            <ul className="w-full h-auto border border-neutral-100/20 rounded-2xl flex flex-col">

                {/* for Github */}
                <li
                    onClick={() => { setModal(true); setMode("Github"); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden transition-colors rounded-t-2xl border-b border-neutral-100/20">
                    <div className="flex gap-2 items-center">
                        <i className="ri-github-fill text-neutral-100/60 text-lg"></i>
                        <span>Github</span>
                        <span className="text-neutral-100/60 text-sm">{githubURL}</span>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

                {/* for other than linkedin or github */}
                {profileData?.links?.filter(link => link.platform !== "Github" && link.platform !== "LinkedIn").map(link => {

                    const normalizedPlatform = link?.platform?.toLowerCase().replace(/\s+/g, "");
                    const iconClass = platformIcons[normalizedPlatform] || "ri-link";

                    return (
                        <li
                            key={link.url}
                            onClick={() => { setModal(true); setMode(link?.platform); }}
                            className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden transition-colors border-b border-neutral-100/20">
                            <div className="flex gap-2 items-center">
                                <i className={`${iconClass} text-neutral-100/60 text-lg`}></i>
                                <span> {link?.platform}</span>
                                <span className="text-neutral-100/60 text-sm">{link?.url}</span>
                            </div>
                            <span className="flex items-center gap-3">
                                <i
                                    onClick={(e) => { e.stopPropagation(); setLinkToDelete(link); setDeleteModal(true); }}
                                    className="ri-delete-bin-6-line text-red-400"></i>
                                <i className="ri-arrow-right-long-line"></i>
                            </span>
                        </li>
                    )
                })}

                {/* for LinkedIn */}
                <li
                    onClick={() => { setModal(true); setMode("LinkedIn"); }}
                    className="w-full px-7 py-3 flex justify-between hover:bg-[#1d1d24] overflow-hidden rounded-b-2xl transition-colors">
                    <div className="flex gap-2 items-center">
                        <i className="ri-linkedin-box-fill text-neutral-100/60 text-lg"></i>
                        <span> LinkedIn</span>
                        <span className="text-neutral-100/60 text-sm">{linkedInURL}</span>
                    </div>
                    <span>
                        <i className="ri-arrow-right-long-line"></i>
                    </span>
                </li>

            </ul>

        </div>
    )
}

export default ProfileSocial
