const Welcome = ({ data }) => {
    return (
        <div className="flex justify-between items-center my-3 pl-3 font-poppins">
            <div className="flex flex-col gap-1">
                <h2 className="font-bold text-[34px] leading-none">Welcome back, {data.user.name}✨</h2>
                <span className="text-gray-400 text-sm sm:text-[16px]">"Keep building your legacy, Today is a great day to ship code"</span>
            </div>
        </div>
    )
}

export default Welcome
