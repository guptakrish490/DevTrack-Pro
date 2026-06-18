import { useState } from "react"
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    githubURL: "",
    leetcodeURL: "",
    avatarURL: "",
    bio: ""
  })

  const [step, setStep] = useState(1)

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Register Page</h1>

      {step === 1 && <Step1 step={step} setStep={setStep} formData={formData} setFormData={setFormData} />}
      {step === 2 && <Step2 step={step} setStep={setStep} formData={formData} setFormData={setFormData} />}
      {step === 3 && <Step3 step={step} setStep={setStep} formData={formData} setFormData={setFormData} />}

    </div>
  )
}

export default Register
