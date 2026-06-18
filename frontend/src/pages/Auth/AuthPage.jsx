import { useState } from "react"
import Login from "./Login"
import Register from "./Register"

const AuthPage = () => {
    const [isRegistered, setIsRegistered] = useState(true)

    return (
        <div>
            {isRegistered ? <Login /> : <Register />}

            {isRegistered ? (
                <div className="px-8 py-2">
                    <span onClick={() => setIsRegistered(false)} className="cursor-pointer underline">
                        New user? Signup
                    </span>
                </div>
            ) : (
                <div className="px-8 py-2">
                    <span onClick={() => setIsRegistered(true)} className="cursor-pointer underline">
                        Already registered? Login
                    </span>
                </div>
            )}
        </div>
    )
}

export default AuthPage
