import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import bg from "../../assets/images/background.png"
import { useState, useEffect } from "react"
import axios from "axios"


const Layout = ({ children }) => {

  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`, { withCredentials: true })
      setData(res.data)
    }

    fetchUser()
  }, [])



  return (
    <div className="absolute h-full w-screen bg-[#02000f] flex">

        <Sidebar data={data} />
        <div className="flex-1">
          <Navbar data={data} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 text-white overflow-y-auto scrollbar-custom">
            {children}
          </main>
        </div>

    </div>
  )
}

export default Layout
