import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData,
      { withCredentials: true })
    navigate('/dashboard')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }



  return (
    <div className="flex flex-col border-2 m-1 p-4 rounded-lg bg-zinc-300 border-gray-500">
      <h1 className="text-3xl font-bold underline">Login Page</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8">

        <input
          name="email"
          onChange={handleChange}
          className="border-zinc-800 outline-none placeholder:text-black font-medium border-2 rounded px-5 py-2 text-black"
          type="text"
          placeholder="Enter your email" />

        <input
          name="password"
          onChange={handleChange}
          className="border-zinc-800 outline-none placeholder:text-black font-medium border-2 rounded px-5 py-2 text-black"
          type="password"
          placeholder="Enter your password" />


        <button className="w-full py-2 bg-amber-300 rounded-lg mt-4 self-center">Login</button>

      </form>

    </div>
  )
}

export default Login
