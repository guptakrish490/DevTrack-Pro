const Step2 = ({ step, setStep, formProps2 }) => {


    return (
        <form
            role="dialog"
            aria-modal="true"
            onSubmit={()=>setStep(3)}
            className="w-full h-auto rounded-xl text-white font-poppins flex flex-col  justify-center gap-5"
        >

            <div className="flex flex-col w-full gap-3 py-3">

                {/* Github URL */}
                <div className="flex flex-col gap-1">
                    <label className="text-[13px] text-purple-100/50 font-open-sans font-medium">
                        GITHUB URL
                    </label>
                    <input
                        value={formProps2.githubURL}
                        onChange={(e) => {
                            formProps2.setGithubURL(e.target.value);
                            // setEmailError(validateEmail(e.target.value));
                        }}
                        placeholder="https://github.com/username"
                        type="text"
                    // aria-invalid={!!emailError}
                    className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border border-neutral-100/15 focus:ring-violet-500 focus:outline-none focus:ring-2`}
                    />
                    {/* {emailError && (
                        <span className="text-red-500 text-xs">{emailError}</span>
                    )} */}
                </div>

                {/* LinkedIn URL */}
                <div className="flex flex-col gap-1">
                    <label className="text-[13px] text-purple-100/50 font-open-sans font-medium">
                        LINKEDIN URL
                    </label>
                    <input
                        value={formProps2.linkedinURL}
                        onChange={(e) => {
                            formProps2.setLinkedinURL(e.target.value);
                            // setEmailError(validateEmail(e.target.value));
                        }}
                        placeholder="https://linkedin.com/in/username"
                        type="text"
                    // aria-invalid={!!emailError}
                    className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border border-neutral-100/15 focus:ring-violet-500 focus:outline-none focus:ring-2`}
                    />
                    {/* {emailError && (
                        <span className="text-red-500 text-xs">{emailError}</span>
                    )} */}
                </div>

                <span className="text-[10px] text-purple-50/50">These links are optional and can be updated later from your profile.</span>

            </div>

            <div className="flex items-center gap-4 justify-between">
                <button
                    type="button"
                    onClick={()=>setStep(1)}
                    className="w-1/4 py-2 text-sm text-neutral-300/50 rounded-xl flex items-center gap-1 justify-center bg-[#17171e] border border-neutral-100/15 transition-colors">
                        <span>Back</span>
                        <i className="ri-arrow-left-long-line"></i>
                </button>
                <button className="w-3/4 py-2 text-sm rounded-xl font-semibold flex items-center gap-1 justify-center bg-violet-600 hover:bg-viol100-500 transition-colors">
                    <span>Continue</span>
                    <i className="ri-arrow-right-long-line"></i>
                </button>
            </div>
        
        </form>
    )
}

export default Step2
