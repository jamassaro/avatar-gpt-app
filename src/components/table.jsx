import { Button, Table } from "react-bootstrap";
import { unparse } from "papaparse"

const TableComponent = ({ response }) => {
  const jsonString = response?.value?.replace(/```json|```/g, '');
  const json = JSON?.parse(jsonString);
  const value = json.casosDePrueba || []
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
  
      <div className="mb-3 d-flex w-100 justify-content-end gap-3">
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

  export default TableComponent