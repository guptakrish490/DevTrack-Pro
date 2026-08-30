import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import axios from "axios"

const Register = ({ setIsRegistered }) => {

  const [step, setStep] = useState(1)

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  const formProps1 = { name, setName, username, setUsername, email, setEmail, password, setPassword };
  const formProps2 = { githubURL, setGithubURL, linkedinURL, setLinkedinURL };
  const formProps3 = { gender, setGender, location, setLocation, bio, setBio };

  const navigate = useNavigate();


  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleValidationError = (err) => {
    if (err?.response?.status === 400 && Array.isArray(err.response?.data?.error)) {
      const fieldErrors = {};
      err.response.data.error.forEach((e) => {
        fieldErrors[e.field] = e.message;
      });
      setErrors(fieldErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    try {
      const links = [];
      if (githubURL) links.push({ platform: "Github", url: githubURL });
      if (linkedinURL) links.push({ platform: "LinkedIn", url: linkedinURL });

      result = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name,
          username,
          email,
          password,
          links,
          gender,
          location,
          bio
        },
        { withCredentials: true }
      )
      if (!result) throw new Error("Unable to create new account!");
      navigate("/dashboard")

    } catch (err) {
      setError(err.response?.data?.message);
      handleValidationError(err);
    }
  }


  return (
    <div className="w-full h-full min-h-screen rounded-xl pt-14 text-white font-poppins flex flex-col p-7 justify-start gap-4 transition-all">

      <div className="flex w-full gap-1 h-1">
        <div className={`w-full h-full rounded-sm transition-colors duration-500 ${step >= 1 ? "bg-purple-500/70" : "bg-white/20"}`}></div>
        <div className={`w-full h-full rounded-sm transition-colors duration-500 ${step >= 2 ? "bg-purple-500/70" : "bg-white/20"}`}></div>
        <div className={`w-full h-full rounded-sm transition-colors duration-500 ${step >= 3 ? "bg-purple-500/70" : "bg-white/20"}`}></div>
      </div>


      <div>
        <div>
          {step === 1 && <h1 className="text-xl font-semibold">Create Account</h1>}
          {step === 2 && <h1 className="text-xl font-semibold">Proffesional Links</h1>}
          {step === 3 && <h1 className="text-xl font-semibold">About You</h1>}
        </div>

        <div className="text-sm text-neutral-300/60">
          <p>{`Step ${step} of 3`}</p>
        </div>
      </div>


      {step === 1 && (
        <div className="animate-scaleIn">
          <Step1 formProps1={formProps1} setStep={setStep} errors={errors} setErrors={setErrors} />
        </div>
      )}

      {step === 2 && (
        <div className="animate-fadeIn">
          <Step2 formProps2={formProps2} setStep={setStep} errors={errors} setErrors={setErrors} />
        </div>
      )}

      {step === 3 && (
        <div className="animate-fadeIn">
          <Step3 handleSubmit={handleSubmit} formProps3={formProps3} setStep={setStep} errors={errors} setErrors={setErrors} />
        </div>
      )}

      <div className="w-full flex justify-center">
        <span className="text-sm text-neutral-300/60">
          <span>Already have an account?</span>
          <span
            onClick={() => setIsRegistered(true)}
            className="cursor-pointer hover:text-violet-400 text-violet-500 font-semibold"
          >
            {" "}
            Sign In
          </span>
        </span>
      </div>

    </div>
  )
}

export default Register
