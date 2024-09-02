import {  useParams } from "react-router-dom"
import {  getMessages, getRun } from "../services/gpt"
import {  useEffect, useState } from "react"
import TableComponent from "../components/table"
import { Blocks } from "react-loader-spinner"


const ThreatId = () => {
  const [runComplete, setRunComplete] = useState(false)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
 const { threatId, runId } = useParams()

 useEffect(() => {
  setLoading(true);
  
  const handleGetMessages = async () => {
    await getMessages(threatId).then((res) => {
      setResponse(res.data[0].content[0].text);
    });
  };
  
  const handleRuns = async () => {
    await getRun(threatId, runId).then(({ status }) => {
      if (status === 'completed') {
        handleGetMessages();
        setRunComplete(true);
        setLoading(false);
        clearInterval(intervalId)
    }
  })
  }
   

  handleRuns();
  
  const intervalId = setInterval(() => {
    handleRuns();
  }, 5000);

  return () => clearInterval(intervalId);
}, [threatId, runId]);

  return (
   <div className="w-100">
   <div className="d-flex gap-3">
    </div>
      <hr className="w-100" />
      { loading ? 
      <div className="w-100 d-flex flex-column justify-content-center align-items-center h-100">
        <Blocks
        height="200"
        width="200"
        color="#5280e3"
        ariaLabel="blocks-loading"
        visible={true}
        /> 
        <p>Generando casos de prueba</p>
        </div>
        : runComplete && response ? <TableComponent response={response} /> :  null}  
   </div>
   
 
  )
}

export default ThreatId


 
  // const handleReSendMessages = async () => {
  //   const message= 'Considero que los casos no cubren todas las casuísticas de calidad para la información entregada, reevalúalo y genera más casos para un plan de pruebas que considere casos de borde, sin descartar los generados anteriormente'
  //   await sendMessages(message, threatId).then(() => {
  //     setResponse(false)
  //     // setRun(false)
  //   }).then(async () => {
  //     // await runMessage(threatId)
  //     // setRun(true)
  //   })
  // }