const Step3 = ({ setStep, formProps3, handleSubmit, errors, setErrors, isSubmitting}) => {

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(e)
            }}
            name="step3"
            role="dialog"
            aria-modal="true"
            className="w-full h-auto rounded-xl text-white font-poppins flex flex-col  justify-center gap-5"
        >

            <div className="flex flex-col w-full gap-3 py-3">

                {/* Gender */}
                <div className="flex flex-col gap-1">
                    <label className="text-[13px] text-purple-100/50 font-open-sans font-medium">
                        GENDER
                    </label>
                    <select
                        value={formProps3.gender}
                        autoComplete='gender'
                        onChange={(e) => formProps3.setGender(e.target.value)}
                        name="gender"
                        className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border border-neutral-100/15 focus:ring-violet-500 focus:outline-none focus:ring-2`}>
                        <option value="" disabled>Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1">
                    <label className="text-[13px] text-purple-100/50 font-open-sans font-medium">
                        LOCATION
                    </label>
                    <input
                        value={formProps3.location}
                        onChange={(e) => {
                            formProps3.setLocation(e.target.value);
                        }}
                        placeholder="City, Country"
                        type="text"
                        className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border border-neutral-100/15 focus:ring-violet-500 focus:outline-none focus:ring-2`}
                    />
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-1">
                    <label className="text-[13px] text-purple-100/50 font-open-sans font-medium">
                        BIO
                        <span title="required" className="text-red-500"> *</span>
                    </label>
                    <textarea
                        value={formProps3.bio}
                        autoComplete='bio'
                        onChange={(e) => {
                            setErrors(prev => ({ ...prev, bio: "" }))
                            formProps3.setBio(e.target.value);
                        }}
                        placeholder="Tell us about yourself, your interests, and what you're building..."
                        type="text"
                        aria-invalid={!!errors.bio}
                        className={`p-3 w-full h-20 rounded-xl text-xs bg-[#131318] border ${errors.bio ? "border-red-500 focus:ring-red-500" : "border-neutral-100/15 focus:ring-violet-500"} focus:outline-none focus:ring-2`} />
                    {errors.bio && (
                        <span className="text-red-500 text-xs">{errors.bio}</span>
                    )}
                </div>
            </div>


            <div className="flex items-center gap-4 justify-between">
                <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/4 py-2 text-sm text-neutral-300/50 rounded-xl flex items-center gap-1 justify-center bg-[#17171e] border border-neutral-100/15 transition-colors">
                    <span>Back</span>
                    <i className="ri-arrow-left-long-line"></i>
                </button>
                <button
                    disabled={isSubmitting}
                    className="w-3/4 py-2 text-sm rounded-xl font-semibold flex items-center gap-1 justify-center bg-violet-600 hover:bg-violet-700 transition-colors">
                    <span>{isSubmitting ? "Creating..." : "Create Account"}</span>
                </button>

            </div>
        </form>
    )
}

export default Step3
