import { NavLink } from "react-router-dom"

const UserDetails = ({ userData }) => {

    console.log(userData)

    return (
        <div className="shadow-md transition hover:shadow-purple-500/10 w-full h-auto border border-neutral-400/15 rounded-2xl bg-[#111118] flex gap-2 flex-col md:flex-row p-7 font-poppins">

            <div className="h-full flex items-start w-auto min-w-23 p-2">
                <img
                    src={userData?.avatarURL}
                    alt="profileImg"
                    className="rounded-full w-18 h-18 object-cover" />
            </div>

            <div className="w-full font-poppins h-full flex flex-col gap-2">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold font-mono">{userData?.name}</h1>
                    <h3 className="text-gray-500 font-mono cursor-pointer">@{userData?.username}</h3>
                </div>
                <div className="text-sm text-neutral-300/90">
                    <p>{userData?.bio}</p>
                </div>
                <div className="flex flex-col gap-1 mt-3">
                    <span className="text-xs font-open-sans text-neutral-100 flex gap-1 items-center">
                        <i className="ri-calendar-line text-[15px]"></i>
                        <span>Joined on&nbsp;
                            {
                                new Date(userData?.joinedOn).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })
                            }
                        </span>
                    </span>
                    <span className="text-xs font-open-sans text-neutral-100 flex gap-1 items-center">
                        <i className="ri-time-line text-[15px]"></i>
                        <span>Last activity on&nbsp;
                            {
                                new Date(userData?.lastActiveOn).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })
                            }
                        </span>
                    </span>
                </div>
            </div>

            <div className="w-auto h-full flex flex-col justify-between">
                <NavLink to="/settings/profile" className="flex-nowrap max-w-35 flex text-nowrap gap-1 items-center px-4 py-1 border border-neutral-400/20 rounded-xl bg-[#1d1d24] text-purple-100/55 cursor-pointer">
                    <i className="ri-pencil-line text-xl"></i>
                    <span className="text-[14px] font-semibold">Edit Profile</span>
                </NavLink>
            </div>

        </div>
    )
}

export default UserDetails
