import { useState } from "react";

const Step1 = ({ step, setStep, formProps1 }) => {

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateName = (value) => {
        if (!value) return "Full name is required";
        if (value.length < 3) return "Name must be at least 3 characters";
        return "";
    };

    const validateEmail = (value) => {
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email address";
        return "";
    };

    const validateUsername = (value) => {
        if (!value) return "Username is required";
        if (value.length < 4) return "Username must be at least 4 characters";
        return "";
    };

    const validatePassword = (value) => {
        if (!value) return "Password is required";

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&\-]{6,}$/;

        if (!regex.test(value)) {
            return "Password must be at least 6 characters and include uppercase, lowercase, number, and special character";
        }

        return "";
    };

    const [visiblePassword, setVisiblePassword] = useState(false)

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                const nErr = validateName(formProps1.name);
                const eErr = validateEmail(formProps1.email);
                const uErr = validateUsername(formProps1.username);
                const pErr = validatePassword(formProps1.password);

                setNameError(nErr);
                setEmailError(eErr);
                setUsernameError(uErr);
                setPasswordError(pErr);

                if (!nErr && !eErr && !uErr && !pErr) {
                    setStep(2);
                }
            }}
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
                        onChange={(e) => {
                            formProps1.setName(e.target.value);
                            setNameError(validateName(e.target.value));
                        }}
                        placeholder="Alex Mercer"
                        type="text"
                        aria-invalid={!!nameError}
                        className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border ${nameError ? "border-red-500 focus:ring-red-500" : "border-neutral-100/15 focus:ring-violet-500"} focus:outline-none focus:ring-2`} />
                    {nameError && (
                        <span className="text-red-500 text-xs">{nameError}</span>
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
                        onChange={(e) => {
                            formProps1.setEmail(e.target.value);
                            setEmailError(validateEmail(e.target.value));
                        }}
                        placeholder="alex@example.com"
                        type="text"
                        aria-invalid={!!emailError}
                        className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border ${emailError ? "border-red-500 focus:ring-red-500" : "border-neutral-100/15 focus:ring-violet-500"} focus:outline-none focus:ring-2`} />
                    {emailError && (
                        <span className="text-red-500 text-xs">{emailError}</span>
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
                        onChange={(e) => {
                            formProps1.setUsername(e.target.value);
                            setUsernameError(validateUsername(e.target.value));
                        }}
                        placeholder="alexmercer_487"
                        type="text"
                        aria-invalid={!!usernameError}
                        className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border ${usernameError ? "border-red-500 focus:ring-red-500" : "border-neutral-100/15 focus:ring-violet-500"} focus:outline-none focus:ring-2`} />
                    {usernameError && (
                        <span className="text-red-500 text-xs">{usernameError}</span>
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
                            onChange={(e) => {
                                formProps1.setPassword(e.target.value);
                                setPasswordError(validatePassword(e.target.value));
                            }}
                            placeholder="••••••••••"
                            type={`${!visiblePassword ? "text" : "password"}`}
                            aria-invalid={!!passwordError}
                            className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border ${passwordError ? "border-red-500 focus:ring-red-500" : "border-neutral-100/15 focus:ring-violet-500"} focus:outline-none focus:ring-2`} />
                        <button
                            type="button"
                            onClick={() => setVisiblePassword(!visiblePassword)}
                            className="absolute right-3 px-1 rounded-md flex items-center focus:ring ring-amber-50">
                            <i className={`text-neutral-300/80 ${!visiblePassword ? "ri-eye-fill" : "ri-eye-off-fill"}`}></i>
                        </button>
                    </div>
                    {passwordError && (
                        <span className="text-red-500 text-xs">{passwordError}</span>
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
