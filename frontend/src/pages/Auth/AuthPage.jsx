import { useEffect, useState, useRef } from "react";
import Login from "./Login";
import Register from "./Register";
import Sidebar from "./components/Sidebar";

const AuthPage = () => {
    const [isRegistered, setIsRegistered] = useState(true);
    const formRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 768 && formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, []);

    return (
        <div className="w-screen min-h-screen h-auto bg-[#09090e] flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="h-auto md:w-1/3 w-full bg-[#090918] border border-white/10 font-poppins">
                <Sidebar />
            </div>

            {/* Form section */}
            <div
                ref={formRef}
                className="md:w-2/3 w-full h-auto flex items-center justify-center bg-[#09090e]"
            >
                <div className="w-110 h-150">
                    {isRegistered ? (
                        <Login setIsRegistered={setIsRegistered} />
                    ) : (
                        <Register setIsRegistered={setIsRegistered} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
