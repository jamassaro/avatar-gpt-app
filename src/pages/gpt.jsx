import { useContext } from "react"
import InputDataForm from "../components/input-data.form"
import './gpt-page.css'
import { ThreatContext } from "../contexts/threath-context"


const Gpt = () => {
  const { threathId } = useContext(ThreatContext)
 
  return (
    <div className='form-container'>
      <InputDataForm  threatId={threathId}/>   
    </div>
  
  )
}



export default Gpt;