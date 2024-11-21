import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMessages, getRun } from "../services/gpt"
import TableAudit from "../components/table-audit"
import Report from "../components/report"




const AuditNew = () => {
  const { threatId, runId } = useParams()
  const [runComplete, setRunComplete] = useState(false)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  console.log('response', response)

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
  
    return () => clearInterval(intervalId)
  }, [threatId, runId])

 


  return (
    <>
    {
      loading ? (
        <div>Loading...</div>
      ) : (
        runComplete &&  response ? (
          <div>
          <div className="w-100">
          <Report response={response} />
          <TableAudit response={response} />
          </div>
        </div>
          
        ): null 
      
      )
    }
    
    </>
  
  )
}

export default AuditNew