const Step1 = ({ step, setStep, formData, setFormData }) => {

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleNext = (e) => {
        e.preventDefault()
        setStep(step + 1)
    }

    return (
        <div className="flex flex-col border-2 m-1 p-4 rounded-lg bg-zinc-300 border-gray-500">
            <h2 className="font-semibold">Step {step} of 3</h2>

            <form className="flex flex-col gap-5 p-8">
                <input
                    onChange={handleChange}
                    name="name"
                    value={formData.name}
                    className="border-zinc-800 outline-none placeholder:text-black font-medium border-2 rounded px-5 py-2 text-black"
                    type="text"
                    placeholder="Enter Name" />

                <input
                    onChange={handleChange}
                    name="username"
                    value={formData.username}
                    className="border-zinc-800 outline-none placeholder:text-black font-medium border-2 rounded px-5 py-2 text-black"
                    type="text"
                    placeholder="Enter Username" />

                <input
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                    className="border-zinc-800 outline-none placeholder:text-black font-medium border-2 rounded px-5 py-2 text-black"
                    type="text"
                    placeholder="Enter your email" />

                <input
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                    className="border-zinc-800 outline-none placeholder:text-black font-medium border-2 rounded px-5 py-2 text-black"
                    type="password"
                    placeholder="Enter your password" />


                <button onClick={handleNext} className="w-full py-2 bg-amber-300 rounded-lg mt-4 self-center">Next</button>
            </form>

        </div>
    )
}

export default Step1
