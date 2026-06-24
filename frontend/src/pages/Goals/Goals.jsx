import GoalStats from "./components/GoalStats.jsx"
import GoalContainer from "./components/GoalContainer.jsx"
import GoalCard from "./components/GoalCard.jsx"
import GoalModal from "./components/GoalModal.jsx"
import { useEffect, useState } from "react"
import axios from "axios"

const Goals = () => {
  
  const [goals, setGoals] = useState([])
  const [params,setParams]=useState({});
  const [modal,setModal]=useState(false)

  const fetchGoals=async()=>{
    const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/goals`,{
      withCredentials:true,
      params:params
    })
    setGoals(res.data)
    console.log(res.data)
  }  

  useEffect(() => {
    fetchGoals()
  }, [params])


  return (
    <>
        <GoalModal modal={modal} setModal={setModal} onSaved={fetchGoals} />

        <h1 className="text-2xl sm:text-4xl font-bold font-display my-3 mx-2">Goals Overview🎯</h1>
        <GoalStats goals={goals}/>
        
        <GoalContainer params={params} setParams={setParams} goals={goals} modal={modal} setModal={setModal} />
    </>
  )
}

export default Goals
