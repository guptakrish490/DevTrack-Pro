import { useEffect, useState } from "react"
import UserDetails from "./components/UserDetails"
import UserExtras from "./components/UserExtras"
import UserStats from "./components/UserStats"
import axios from "axios"
import UserMoreDetails from "./components/UserMoreDetails"
import ConfirmLogoutModal from "./components/ConfirmLogoutModal"

const Profile = () => {

  const [userData, setUserData] = useState(null)
  const [logoutModal, setLogoutModal] = useState(false);


  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/profile`,
        { withCredentials: true }
      )

      setUserData(res.data);
    }
    catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <>
      <UserDetails
        userData={userData}
        setLogoutModal={setLogoutModal} />

      <UserMoreDetails
        userData={userData} />

      <UserStats
        userData={userData} />

      <UserExtras
        userData={userData} />

      <ConfirmLogoutModal
        logoutModal={logoutModal}
        setLogoutModal={setLogoutModal} />
    </>
  )
}

export default Profile
