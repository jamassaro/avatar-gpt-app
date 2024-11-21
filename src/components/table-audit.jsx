
import { Table } from 'react-bootstrap'

const TableAudit = ({ response }) => {
  
  const jsonString = response?.value?.replace(/```json|```/g, '');
  
  const json = JSON?.parse(jsonString)

  const tableData = json?.testCases || json.test_cases || []

  console.log('tableData', tableData)


  return (
    <div>
      <Table striped bordered hover overFlow-auto>
      <thead>
        <tr>
          <th>#</th>
          <th>Test Type</th>
          <th>Case Identifier</th>
          <th>Summary</th>
          {/* <th>Pre-condition</th> */}
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
        {tableData?.map((testCase, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{testCase['Tipo de prueba'] || ''}</td>
            <td>{testCase.Identificador || ''}</td>
            <td>{testCase?.Resumen || ''}</td>
            {/* <td>{testCase?.PreCondicion || ''}</td> */}
            <td>{testCase?.Descripción || ''}</td>
              <td>{
                testCase.Pasos?.map((step, index) => (
                    <p key={index}>{step}</p>
                ))
                }</td>
            <td>{testCase?.Datos || ''}</td>
            <td>{testCase['Resultados Esperados'] || ''}</td>
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

export default TableAudit