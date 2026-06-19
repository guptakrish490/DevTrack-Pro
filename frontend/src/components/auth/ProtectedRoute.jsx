import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"

const ProtectedRoute = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`, { withCredentials: true })
                setIsAuth(true)
            } catch {
                setIsAuth(false)
            }
        }
        checkAuth()
    }, [])

    if (isAuth === null) return <p>Loading...</p>

    return isAuth ? children : <Navigate to="/" replace />
}

export default ProtectedRoute
