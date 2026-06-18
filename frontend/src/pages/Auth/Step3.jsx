import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Step3 = ({ formData, setFormData, step, setStep }) => {

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handlePrev = (e) => {
        e.preventDefault()
        setStep(step - 1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData, { withCredentials: true })
            const token = res.data.token
            navigate('/dashboard')

        }
        catch (err) {
            console.error("Registration failed:", err.response?.data || err.message)
        }

    }

    return (
        <div className="flex flex-col border-2 m-1 p-4 rounded-lg bg-zinc-300 border-gray-500">
            <h2 className='font-semibold'>Step {step} of 3</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8">
                <input
                    onChange={handleChange}
                    name="avatarURL"
                    value={formData.avatarURL}
                    className="border-zinc-800 outline-none placeholder:text-black font-medium border-2 rounded px-5 py-2 text-black"
                    type="text"
                    placeholder="Enter Avatar URL" />

                <textarea
                    onChange={handleChange}
                    name="bio"
                    value={formData.bio}
                    className="border-zinc-800 outline-none placeholder:text-black font-medium border-2 rounded px-5 py-2 text-black"
                    type="text"
                    placeholder="Enter your Bio" />


                <button onClick={handlePrev} className="w-full py-2 bg-amber-300 rounded-lg mt-4 self-center">Previous</button>
                <button className="w-full py-2 bg-amber-300 rounded-lg mt-4 self-center">Submit</button>
            </form>

        </div>
    )
}

export default Step3
