import { useEffect, useState } from "react"
import InputDataForm from "../components/input-data.form"
import { createThreathread } from "../services/gpt"


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
      <InputDataForm  threatId={threatId}/>
  )
}



export default Gpt;