const UserExtras = ({ userData }) => {

    const links = userData?.links || [];

    const platformIcons = {
        github: "ri-github-line",
        leetcode: "ri-code-s-slash-line",
        linkedin: "ri-linkedin-box-fill",
        codeforces: "ri-code-box-line",
        codechef: "ri-restaurant-line"
    }

    return (
        <div className="shadow-md transition hover:shadow-purple-500/10 w-full flex flex-col gap-4 p-6 border border-neutral-700/40 rounded-2xl bg-[#111118] my-7" >
            <h2 className="text-xl font-bold text-gray-200 mb-1">
                Professional Links
            </h2>

            {links.map((link) => {
                const normalizedPlatform = link?.platform.toLowerCase().replace(/\s+/g, "");
                const iconClass = platformIcons[normalizedPlatform] || "ri-link";

                return (
                    <div
                        key={link.platform}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full px-4 py-3 border border-neutral-700/40 rounded-xl bg-[#1a1a22] hover:bg-[#22222b] transition"
                    >
                        <div className="flex items-center gap-3">
                            <i className={`${iconClass} text-xl text-gray-300 px-2 py-1 bg-neutral-100/10 rounded-xl`} />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-200">
                                    {link.platform}
                                </span>
                                <a
                                    href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-poppins text-sm text-purple-300 hover:underline break-all"
                                >
                                    {link.url}
                                </a>
                            </div>
                        </div>

                        <a
                            href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hidden sm:flex hover:text-purple-300 self-start sm:self-auto"
                        >
                            <i className="ri-external-link-line text-lg"></i>
                        </a>
                    </div>
                );
            })}


        </div >

    )
}

export default UserExtras
