const Step2 = ({ step, setStep, formData, setFormData }) => {

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleNext = (e) => {
        e.preventDefault()
        setStep(step + 1)
    }

    const handlePrev = (e) => {
        e.preventDefault()
        setStep(step - 1)
    }

    return (
        <div className="flex flex-col border-2 m-1 p-4 rounded-lg bg-zinc-300 border-gray-500">
            <h2 className="font-semibold">Step {step} of 3</h2>

            <form className="flex flex-col gap-5 p-8">
                <input
                    onChange={handleChange}
                    name="githubURL"
                    value={formData.githubURL}
                    className="border-zinc-800 outline-none placeholder:text-black font-medium border-2 rounded px-5 py-2 text-black"
                    type="text"
                    placeholder="Enter Github URL" />

                <input
                    onChange={handleChange}
                    name="leetcodeURL"
                    value={formData.leetcodeURL}
                    className="border-zinc-800 outline-none placeholder:text-black font-medium border-2 rounded px-5 py-2 text-black"
                    type="text"
                    placeholder="Enter Leetcode URL" />


                <button onClick={handlePrev} className="w-full py-2 bg-amber-300 rounded-lg mt-4 self-center">Previous</button>
                <button onClick={handleNext} className="w-full py-2 bg-amber-300 rounded-lg mt-4 self-center">Next</button>
            </form>

        </div>
    )
}

export default Step2
