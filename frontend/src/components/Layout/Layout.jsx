import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import bg from "../../assets/images/background.png"
import { useState, useEffect } from "react"
import axios from "axios"


const Layout = ({ children }) => {

  const [data, setData] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`, { withCredentials: true })
      setData(res.data)
    }

    fetchUser()
  }, [])



  return (
    <div className="absolute left-0 top-0 h-full w-screen bg-[#09090e] flex">
        
        {/* overlay on small screen */}
        {sidebarOpen && (<div className="fixed z-20 inset-0 bg-black/40 backdrop-blur-sm sm:hidden" onClick={() => setSidebarOpen(!sidebarOpen)} ></div>)}
        
        {/* sidebar */}
        <Sidebar data={data} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* navbar and main */}
        <div className="flex-1 flex flex-col">
          <Navbar data={data} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="text-white overflow-y-auto scrollbar-custom p-4">
            {children}
          </main>
        </div>

    </div>
  )
}

export default Layout
