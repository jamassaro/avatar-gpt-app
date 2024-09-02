import { useEffect, useState } from "react"
import InputDataForm from "../components/input-data.form"
import { createThreathread } from "../services/gpt"
import './gpt-page.css'


const Gpt = () => {
  const [threatId, setThreatId] = useState(null)

 
  const handleCreateThreathread = async () => {
    createThreathread().then((res) => {
      setThreatId(res.id)
    })
  }
  
  useEffect(() => {
    handleCreateThreathread()
  }, [])
  
  return (
    <div className='form-container'>
      <InputDataForm  threatId={threatId}/>   
    </div>
  
  )
}



export default Gpt;