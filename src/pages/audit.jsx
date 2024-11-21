import { useContext, useState } from "react";
import Papa from 'papaparse';
import { Button, Form } from "react-bootstrap"
import { ThreatContext } from "../contexts/threath-context";
import { runMessage, sendMessages } from "../services/gpt";
import { useNavigate } from "react-router-dom";


const Audit = () => {
  const { threathId } = useContext(ThreatContext)
  console.log('threatId', threathId)
  const [jsonData, setJsonData] = useState(null);
  const navigate = useNavigate()
  console.log('jsonData', jsonData)

  
  const handleFileChange = (event) => {
    const csvFile = event.target.files[0];
    if (csvFile) {
      Papa.parse(csvFile, {
        complete: (result) => {
    
          setJsonData(result.data);
        },
        header: true, 
      });
    } else {
      alert("Please select a CSV file.");
    }
    
  };

  const handleRuns = async () => {
    const assistantId = 'asst_j6RTc2J3GRb7fxJYPGuKnLHv'
    await runMessage(threathId, assistantId).then((res) => {
     navigate(`/audit/new/threat/${threathId}/run/${res.id}`)
   })
  }
 
  const handleSubmit = async (event) => {
    event.preventDefault()
    await sendMessages(JSON.stringify(jsonData), threathId).then(() => {
      handleRuns()
    }).catch(() => {
      alert('Ingresa una credencial valida')
    })

    
  };
   

  return (
    <div className="container">
      <h2>Auditoria Planes de Pruebas</h2>
    <div>
    <Form onSubmit={handleSubmit} >
        {/* File Upload */}
        <Form.Group className="mb-3 w-50" controlId="formFile">
          <Form.Label>Ingrese Plan de Pruebas</Form.Label>
          <Form.Control type="file" accept=".csv"  onChange={handleFileChange} />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Aceptar
        </Button>
      </Form>
    </div>
    </div>
  )
}

export default Audit
