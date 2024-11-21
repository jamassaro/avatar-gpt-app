import './report.css'

const Report = ({ response = {} }) => {
  
  const jsonString = response?.value?.replace(/```json|```/g, '');
  const json = JSON?.parse(jsonString);
  const report = json?.summary_report || json.summaryReport || {}

   delete report['Anexos y Ejemplos']

   console.log('report', report)
  return (
    <>
      <div className="report-card">
        <h2 className="text-center mb-4">Informe de revision plan de pruebas</h2>
          {Object.entries(report).map(([sectionKey, sectionContent]) => (
            <div className="section" key={sectionKey}>
              <h2>{sectionKey}</h2>
                {Object.entries(sectionContent).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
            </div>
        ))}
    </div>
  </>
   
    
    
    
      
  )
}

export default Report