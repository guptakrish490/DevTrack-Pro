import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import bg from "../../assets/images/background.png"

const Layout = ({ children }) => {
  return (
    <div>

      <div className="absolute h-screen w-screen bg-cover bg-center bg-black bg-no-repeat" style={{ backgroundImage: `url(${bg})` }} >

        <div className="flex relative w-screen">
          <Navbar />
        </div >

        <div className=" mt-12 md:mt-16 w-full h-[calc(100vh-4rem)]">
          <Sidebar />
          <div className="h-full w-full overflow-y-auto pt-4 md:pl-[28%] lg:pl-70 pl-4 scrollbar-custom  text-white">
              {children}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Layout
