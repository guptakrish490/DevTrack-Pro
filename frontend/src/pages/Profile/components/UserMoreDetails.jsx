import React from 'react'

const UserMoreDetails = ({ userData }) => {

    const others = userData?.others || {};

    if (!others) return null;

    return (
        <div className="shadow-md transition hover:shadow-purple-500/10 w-full flex flex-col gap-4 p-6 border border-neutral-700/40 rounded-2xl bg-[#111118] my-7">
            <h2 className="text-xl font-bold text-gray-200 mb-1">Additional Details</h2>

            {/* Institute */}
            <div className="flex flex-col sm:justify-between w-full px-4 py-3 border border-neutral-700/40 rounded-xl bg-[#1a1a22] hover:bg-[#22222b]">
                <span className="text-lg font-semibold text-gray-200 flex gap-1 items-center"><i className='ri-school-line font-light text-lg'></i>Institute</span>
                <span className="text-sm text-purple-300 break-all">{others.instituteName}</span>
            </div>

            {/* Workplace */}
            <div className="flex flex-col sm:justify-between w-full px-4 py-3 border border-neutral-700/40 rounded-xl bg-[#1a1a22] hover:bg-[#22222b]">
                <span className="text-lg font-semibold text-gray-200 flex gap-1 items-center"><i className="ri-building-line font-light text-lg"></i>Workplace</span>
                <span className="text-sm text-purple-300 break-all">{others.workplace}</span>
            </div>

            {/* Role */}
            <div className="flex flex-col sm:justify-between w-full px-4 py-3 border border-neutral-700/40 rounded-xl bg-[#1a1a22] hover:bg-[#22222b]">
                <span className="text-lg font-semibold text-gray-200 flex gap-1 items-center"><i className="ri-briefcase-4-line font-light text-lg"></i>Role</span>
                <span className="text-sm text-purple-300 break-all">{others.role}</span>
            </div>

            {/* Skills */}
            <div className="flex flex-col sm:items-start sm:justify-between gap-1 w-full px-4 py-3 border border-neutral-700/40 rounded-xl bg-[#1a1a22] hover:bg-[#22222b]">
                <span className="text-lg font-semibold text-gray-200 flex gap-1 items-center"><i className="ri-code-s-slash-line font-light text-lg"></i>Skills</span>
                <div className="flex flex-wrap gap-2.5">
                    {others.skills?.map((skill, idx) => (
                        <span
                            key={idx}
                            className="px-3 cursor-default py-1 text-xs font-medium text-purple-300 border border-purple-300/40 rounded-lg bg-[#22222b] hover:bg-[#27272e]"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserMoreDetails
