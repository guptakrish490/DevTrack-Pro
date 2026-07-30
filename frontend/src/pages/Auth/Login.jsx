import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsRegistered }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginErr, setLoginErr] = useState("");

  const [visiblePassword, setVisiblePassword] = useState(false);

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email address";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!emailErr && !passwordErr) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          { email, password },
          { withCredentials: true }
        );
        navigate("/dashboard");
      } catch (err) {
        setLoginErr(err?.response?.data?.message || err.message)
        console.log(err?.response?.data?.message || err.message)
      }
    }
  };

  return (
    <form
      role="dialog"
      aria-modal="true"
      onSubmit={handleSubmit}
      className="w-full animate-scaleIn h-full rounded-xl text-white font-poppins flex flex-col p-7 justify-center gap-5"
    >
      <div className="w-full">
        <h2 className="text-xl font-semibold">Welcome back</h2>
        <span className="text-neutral-300/60 text-sm">
          Sign in to your DevTrack account
        </span>
      </div>

      <div className="flex flex-col w-full gap-3">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] text-neutral-300/60 font-open-sans font-medium">
            EMAIL
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(validateEmail(e.target.value.trim()));
            }}
            placeholder="alex@example.com"
            type="email"
            aria-invalid={!!emailError}
            className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border ${emailError
              ? "border-red-500 focus:ring-red-500"
              : "border-neutral-100/15 focus:ring-violet-500"
              } focus:outline-none focus:ring-2`}
          />
          {emailError && (
            <span className="text-red-500 text-xs">{emailError}</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] text-neutral-300/60 font-open-sans font-medium">
            PASSWORD
          </label>
          <div className="relative w-full flex items-center">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(validatePassword(e.target.value.trim()));
              }}
              placeholder="••••••••••"
              type={!visiblePassword ? "text" : "password"}
              aria-invalid={!!passwordError}
              className={`px-4 w-full h-9 rounded-xl text-xs bg-[#131318] border ${passwordError
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-100/15 focus:ring-violet-500"
                } focus:outline-none focus:ring-2`}
            />
            <button
              type="button"
              onClick={() => setVisiblePassword(!visiblePassword)}
              className="absolute right-3 px-1 rounded-md flex items-center focus:ring ring-amber-50">
              <i className={`text-neutral-300/80 ${!visiblePassword ? "ri-eye-fill" : "ri-eye-off-fill"}`}></i>
            </button>
          </div>
          {passwordError && (
            <span className="text-red-500 text-xs">{passwordError}</span>
          )}
        </div>
      </div>

      {loginErr && (
        <span className="text-red-500 text-xs capitalize">{loginErr}</span>
      )}

      <div className="flex flex-col gap-6 items-center">
        <button className="w-full py-2 text-sm rounded-xl font-semibold bg-violet-600 hover:bg-violet-700 transition-colors">
          Sign in
        </button>
        <div>
          <span className="text-sm text-neutral-300/60">
            <span>No account?</span>
            <span
              onClick={() => setIsRegistered(false)}
              className="cursor-pointer hover:text-violet-400 text-violet-500 font-semibold"
            >
              {" "}
              Create one
            </span>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;
