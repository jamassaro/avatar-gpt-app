import { useContext } from "react"
import InputDataForm from "../components/input-data.form"
import './gpt-page.css'
import { ThreatContext } from "../contexts/threath-context"


const Gpt = () => {
  const { threatId } = useContext(ThreatContext)
 
  return (
    <div className='form-container'>
      <InputDataForm  threatId={threatId}/>   
    </div>
  
  )
}



export default Gpt;