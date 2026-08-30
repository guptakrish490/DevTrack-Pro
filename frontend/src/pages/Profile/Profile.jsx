import { useEffect, useState } from "react"
import UserDetails from "./components/UserDetails"
import UserExtras from "./components/UserExtras"
import UserStats from "./components/UserStats"
import UserMoreDetails from "./components/UserMoreDetails"
import ConfirmLogoutModal from "./components/ConfirmLogoutModal"
import api from "../../api/api.js"

const Profile = () => {

  const [userData, setUserData] = useState(null)
  const [logoutModal, setLogoutModal] = useState(false);

  const [error, setError] = useState("");


  const fetchUser = async () => {
    try {
      const res = await api.get(`/profile`);
      setUserData(res.data);
    }
    catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile!");
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
