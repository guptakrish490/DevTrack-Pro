import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import api from "../../api/api"

const ProtectedRoute = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get(`/dashboard`)
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
