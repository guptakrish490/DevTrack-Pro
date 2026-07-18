import React from "react";

const ProductivityOverview = ({ userData }) => {
    const calcPercent = (completed, total) =>
        total > 0 ? Math.round((completed / total) * 100) : 0;

    const goalPercent = calcPercent(userData?.completedGoalCount, userData?.goalCount);
    const projectPercent = calcPercent(userData?.completedProjectCount, userData?.projectCount);
    const taskPercent = calcPercent(userData?.completedTaskCount, userData?.taskCount);

    return (
        <div className="w-full flex flex-col gap-6 p-6 border border-neutral-700/40 rounded-2xl bg-linear-to-br from-[#111118] to-[#1a1a22] shadow-md my-7 transition hover:shadow-purple-500/10">
            <h2 className="text-xl font-bold text-gray-200 mb-1">Productivity Overview</h2>

            {/* Goals */}
            <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                        <i className="ri-crosshair-2-fill text-lg text-purple-400"></i> Goals
                    </span>
                    <span className="text-sm text-purple-300 uppercase font-poppins flex gap-2">
                        <span className="font-semibold">
                            {userData?.completedGoalCount}/{userData?.goalCount}
                        </span>
                        <span className="">goals completed</span>
                        <span className="font-semibold text-purple-500">({goalPercent}%)</span>
                    </span>
                </div>
                <div className="w-full bg-neutral-700/40 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-linear-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${goalPercent}%` }}
                    ></div>
                </div>
            </div>

            {/* Projects */}
            <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                        <i className="ri-folder-5-line text-lg text-blue-400"></i> Projects
                    </span>
                    <span className="text-sm text-purple-300 uppercase font-poppins flex gap-2">
                        <span className="font-semibold">
                            {userData?.completedProjectCount}/{userData?.projectCount}
                        </span>
                        <span className="">projects completed</span>
                        <span className="font-semibold text-blue-500">({projectPercent}%)</span>
                    </span>
                </div>
                <div className="w-full bg-neutral-700/40 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-linear-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${projectPercent}%` }}
                    ></div>
                </div>
            </div>

            {/* Tasks */}
            <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                        <i className="ri-calendar-todo-line text-lg text-green-400"></i> Tasks
                    </span>
                    <span className="text-sm text-purple-300 uppercase font-poppins flex gap-2">
                        <span className="font-semibold">
                            {userData?.completedTaskCount}/{userData?.taskCount}
                        </span>
                        <span className="">tasks completed</span>
                        <span className="font-semibold text-green-400">({taskPercent}%)</span>
                    </span>

                </div>
                <div className="w-full bg-neutral-700/40 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-linear-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${taskPercent}%` }}
                    ></div>
                </div>
            </div>

            {/* Current & Maximum Streak */}
            <div className="flex flex-col gap-3 mt-6">
                {/* Current Streak */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 border border-neutral-700/40 rounded-xl bg-[#1a1a22] hover:bg-[#22222b] transition">
                    <div className="flex items-center gap-2">
                        <i className="ri-fire-line text-xl text-orange-400 animate-pulse"></i>
                        <span className="text-sm font-semibold text-gray-200">Current Streak</span>
                    </div>
                    <span className="text-sm font-bold text-purple-300">
                        {userData?.currentStreaksCount} days
                    </span>
                </div>

                {/* Maximum Streak */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 border border-neutral-700/40 rounded-xl bg-[#1a1a22] hover:bg-[#22222b] transition">
                    <div className="flex items-center gap-2">
                        <i className="ri-fire-line text-xl text-red-400 animate-pulse"></i>
                        <span className="text-sm font-semibold text-gray-200">Maximum Streak</span>
                    </div>
                    <span className="text-sm font-bold text-purple-300">
                        {userData?.maxStreaksCount} days
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductivityOverview;
