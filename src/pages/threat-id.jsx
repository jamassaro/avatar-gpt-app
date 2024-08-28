import { Button, Table } from "react-bootstrap"
import {  useParams } from "react-router-dom"
import { getMessages, runMessage } from "../services/gpt"
import { useState } from "react"
import { unparse } from "papaparse"


const TableComponent = ({ response }) => {
const jsonString = response?.value?.replace(/```json|```/g, '');
const json = JSON?.parse(jsonString);
console.log('json', json.TestPlan)
const value = json.casosDePrueba
|| []
console.log('json', value)
const convertJsonToCsv = () => {
    const csv = unparse(value);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
  <div className="w-100">

    <div className="mb-3 d-flex w-100 justify-content-end">
    <Button variant="primary" onClick={convertJsonToCsv}>Descargar CSV</Button>
    </div>
    <Table striped bordered hover overFlow-auto>
    <thead>
      <tr>
        <th>#</th>
        <th>Test Type</th>
        <th>Case Identifier</th>
        <th>Summary</th>
        <th>Pre-condition</th>
        <th>Description</th>
        <th>Action</th>
        <th>Test Data</th>
        <th>Expected Results</th>
        <th>Responsible</th>
        <th>Repository Directory</th>
        <th>Business</th>
      </tr>
    </thead>
    <tbody>
      {value?.map((testCase, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{testCase['Tipo de test'] || ''}</td>
          <td>{testCase['Identificador del caso'] || ''}</td>
          <td>{testCase?.Resumen || ''}</td>
          <td>{testCase?.PreCondicion || ''}</td>
          <td>{testCase?.Descripción || ''}</td>
          <td>{testCase?.Accion || ''}</td>
          <td>{testCase?.Datos || ''}</td>
          <td>{testCase['Resultados esperados'] || ''}</td>
          <td>{testCase?.Responsable || ''}</td>
          <td>{testCase['Directorio de repositorio de test'] || ''}</td>
          <td>{testCase?.Negocio || ''}</td>
        </tr>
      ))}
    </tbody>
  </Table>
    </div>
  )
}


const ThreatId = () => {
  const [response, setResponse] = useState(null)


 const { threatId } = useParams()
  

  const handleRuns = async () => {
    await runMessage(threatId)
  }

  const handleGetMessages = async () => {
    if(threatId){
      await getMessages(threatId).then((res) => {
        setResponse(res.data[0].content[0].text)
      })
     
    } else {
      console.log('error')
    }
  } 



  return (
   <div className="w-100">
   <div className="d-flex gap-3">
        <Button variant="primary" onClick={handleRuns}>Run</Button>
        <Button variant="primary" onClick={handleGetMessages}>Messages</Button>
      </div>
      <hr className="w-100" />
      {response ? <TableComponent response={response} /> : null}  
   </div>
   
 
  )
}

export default ThreatId