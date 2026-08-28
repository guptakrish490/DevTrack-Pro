import { useState } from "react";

const Step1 = ({ setStep, formProps1, errors, setErrors }) => {

    const [visiblePassword, setVisiblePassword] = useState(false)

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
            }}
            name="step1"
            role="dialog"
            aria-modal="true"
            className="w-full h-auto rounded-xl text-white font-poppins flex flex-col  justify-center gap-5"
        >

            <div className="flex flex-col w-full gap-3 py-3">
                {/* {Name} */}
                <div className="flex flex-col gap-1">
                    <label className="text-[13px] text-purple-50/70 font-open-sans font-medium">
                        FULL NAME
                        <span title="required" className="text-red-500"> *</span>
                    </label>
                    <input
                        value={formProps1.name}
                        autoComplete="name"
                        onChange={(e) => {
                            setErrors(prev => ({ ...prev, name: "" }))
                            formProps1.setName(e.target.value);
                        }}
                        placeholder="Alex Mercer"
                        type="text"
                        aria-invalid={!!errors.name}
                        className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border ${errors.name ? "border-red-500 focus:ring-red-500" : "border-neutral-100/15 focus:ring-violet-500"} focus:outline-none focus:ring-2`} />
                    {errors.name && (
                        <p className="text-red-500 text-xs px-2">{errors.name}</p>
                    )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-[13px] text-purple-50/70 font-open-sans font-medium">
                        EMAIL
                        <span title="required" className="text-red-500"> *</span>
                    </label>
                    <input
                        value={formProps1.email}
                        autoComplete="email"
                        onChange={(e) => {
                            setErrors(prev => ({ ...prev, email: "" }))
                            formProps1.setEmail(e.target.value);
                        }}
                        placeholder="alex@example.com"
                        type="text"
                        aria-invalid={!!errors.email}
                        className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-neutral-100/15 focus:ring-violet-500"} focus:outline-none focus:ring-2`} />
                    {errors.email && (
                        <p className="text-red-500 text-xs px-2">{errors.email}</p>
                    )}
                </div>

                {/* Username */}
                <div className="flex flex-col gap-1">
                    <label className="text-[13px] text-purple-50/70 font-open-sans font-medium">
                        USERNAME
                        <span title="required" className="text-red-500"> *</span>
                    </label>
                    <input
                        value={formProps1.username}
                        autoComplete="username"
                        onChange={(e) => {
                            setErrors(prev => ({ ...prev, username: "" }))
                            formProps1.setUsername(e.target.value);
                        }}
                        placeholder="alexmercer_487"
                        type="text"
                        aria-invalid={!!errors.username}
                        className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border ${errors.username ? "border-red-500 focus:ring-red-500" : "border-neutral-100/15 focus:ring-violet-500"} focus:outline-none focus:ring-2`} />
                    {errors.username && (
                        <p className="text-red-500 text-xs px-2">{errors.username}</p>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-[13px] text-purple-50/70 font-open-sans font-medium">
                        PASSWORD
                        <span title="required" className="text-red-500"> *</span>
                    </label>
                    <div className="relative w-full flex items-center">
                        <input
                            value={formProps1.password}
                            autoComplete="new-password"
                            onChange={(e) => {
                                setErrors(prev => ({ ...prev, password: "" }))
                                formProps1.setPassword(e.target.value);
                            }}
                            placeholder="••••••••••"
                            type={`${visiblePassword ? "text" : "password"}`}
                            aria-invalid={!!errors.password}
                            className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-neutral-100/15 focus:ring-violet-500"} focus:outline-none focus:ring-2`} />
                        <button
                            type="button"
                            onClick={() => setVisiblePassword(!visiblePassword)}
                            className="absolute right-3 px-1 rounded-md flex items-center focus:ring ring-amber-50">
                            <i className={`text-neutral-300/80 ${!visiblePassword ? "ri-eye-fill" : "ri-eye-off-fill"}`}></i>
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-xs px-2">{errors.password}</p>
                    )}
                </div>
            </div>


            <div className="flex flex-col gap-6 items-center">
                <button className="w-full py-2 text-sm rounded-xl font-semibold flex items-center gap-1 justify-center bg-violet-600 hover:bg-violet-700 transition-colors">
                    <span>Continue</span>
                    <i className="ri-arrow-right-long-line"></i>
                </button>

            </div>
        </form>
    )
}

export default Step1
