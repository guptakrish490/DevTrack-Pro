const Welcome = ({data}) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <h2 className="font-bold text-3xl">Welcome back, {data.user.name}👋</h2>
                <span className="text-gray-400">Keep building your legacy, Today is a great day to ship code.</span>
            </div>

            <div className="flex gap-1 items-center backdrop-blur-md bg-white/10 px-3 py-1 rounded-md border-2 border-white/20">
                <i className="ri-fire-line text-amber-500 text-2xl font-extrabold"></i>
                <span className="text-amber-500 font-bold">{data.streaksCount} day</span>
            </div>
        </div>
    )
}

export default Welcome
