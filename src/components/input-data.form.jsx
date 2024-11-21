import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { runMessage, sendMessages } from "../services/gpt"
import { useNavigate } from "react-router-dom"

const options  = [
  {
  id: 1,
  name: 'Pruebas de Extremo a Extremo'
},
{
  id: 2,
  name: 'Pruebas Funcionales'

},
{
  id: 3,
  name: 'Pruebas de Regresión'

},
{
  id: 4,
  name: ' Pruebas Exploratorias'

},
{
  id: 5,
  name: 'Pruebas de Humo'
}
]
  

const InputDataForm = ({ threatId }) => {
  console.log('threatId', threatId)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState({
    description: '',
    scope: '',
    preconditions: '',
    technologies: '',
    tools: '',
    useCases: '',
    // cases: {},
    types: '',
    information:'',
    assignee: '',
    repository: '',
    area:''
  })

 const {
  description,
  scope,
  preconditions,
  technologies,
  tools,
  useCases,
  types,
  information,
  assignee,
  repository,
  area
} = value
  
 const handleTextChange = (e) => {
  const { name, value } = e.target
  setValue((prev) => ({
    ...prev,
    [name]: value
  }))
 }


 const handleSelectChange = (e) => {
  const { name, value } = e.target
  setValue((prev) => ({
    ...prev,
    [name]: value
  }))
 }

 const assistantId = 'asst_y8DrMYKghk2n1p1FN0BLG8oA'
 const handleRuns = async () => {
  setLoading(true)
  await runMessage(threatId, assistantId).then((res) => {
   navigate(`/threat/${threatId}/run/${res.id}`)
   setLoading(false)
 })
}


  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = description + " " + scope + " " + preconditions + " " + technologies + " " + tools + " " + useCases + " " + types + " " + information + " " + assignee + " " + repository + " " + area + "puedes responder solo con el JSON de respuesta";
    await sendMessages(message, threatId).then(() => {
      handleRuns()
    }).catch(() => {
      alert('Ingresa una credencial valida')
    })
  }

  return (
      <Form onSubmit={handleSubmit} className="w-100" style={{maxWidth: "500px"}}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descripción/Contexto</Form.Label>
            <p style={{fontSize: "12px", fontStyle: "italic"}}>¿Cuál es el propósito del desarrollo?</p>
            <Form.Control name='description' onChange={handleTextChange} as="textarea" rows={2} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Definición y alcance</Form.Label>
            <p style={{fontSize: "12px", fontStyle: "italic"}}>¿Qué partes del sistema se van a probar? ¿Qué funcionalidades y características son las más críticas?</p>
            <Form.Control name='scope' onChange={handleTextChange} as="textarea" rows={2} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Precondiciones</Form.Label>
            <p style={{fontSize: "12px", fontStyle: "italic"}}>Indicar si se deben cumplicar condiciones previas para el correcto funcionamiento de las funcionalidad, como conectividad a la VPN, horarios de fucionamiento, entre otros.</p>
            <Form.Control name='preconditions' onChange={handleTextChange} as="textarea" rows={2} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Tecnología involucrada</Form.Label>
            <p style={{fontSize: "12px", fontStyle: "italic"}}>Información sobre la arquitectura del sistema, incluyendo la interacción entre los sistemas, formato de datos, entre otros.</p>
            <Form.Control name='technologies' onChange={handleTextChange} as="textarea" rows={2} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Herramientas/Sistemas involucrados</Form.Label>
            <p style={{fontSize: "12px", fontStyle: "italic"}}>Especificar las diferentes plataformas involucradas en el proceso de pruebas según corresponda</p>
            <Form.Control name='tools' onChange={handleTextChange} as="textarea" rows={2} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Casos de Uso / Historias de Usuario</Form.Label>
            <p style={{ fontSize: "12px", fontStyle: "italic" }}>Detalle de las historias de usuario, priorizando aquellas que son críticas para el negocio / Escenarios de negocio: Descripción de escenarios reales de uso que representen cómo los usuarios interactuarán con el sistema.</p>
            <Form.Control name='useCases' onChange={handleTextChange} as="textarea" rows={2} />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Casos de prueba existentes</Form.Label>
            <p style={{fontSize: "12px", fontStyle: "italic"}}>Si existe un plan de pruebas previo, cargarlo</p>
            <Form.Control type="file"  />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Tipo de pruebas a realizar</Form.Label>
          <p style={{fontSize: "12px", fontStyle: "italic"}}>Definir los tipos de pruebas a realizar, incluyendo: Pruebas de Extremo a Extremo, Pruebas Funcionales, Pruebas de Regresión, Pruebas Exploratorias, Pruebas de Humo</p>
          <Form.Select name='types' onChange={handleSelectChange} aria-label="Default select example">
            <option>Selecciona un tipo</option>
            {
              options.map((option) => (
                <option key={option.id} value={option.name}>{option.name}</option>
              ))
            }
          </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Información adicional</Form.Label>
            <p style={{fontSize: "12px", fontStyle: "italic"}}>Ingreso de cualquier dato relevante para el proceso de pruebas que no se vea considerado en los campos anteriores</p>
            <Form.Control name='information' onChange={handleTextChange} type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Responsable</Form.Label>
            <p style={{fontSize: "12px", fontStyle: "italic"}}>Nombre de responsable como aparece en Jira</p>
            <Form.Control name='assignee' onChange={handleTextChange} type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Directorio de repositorio de test</Form.Label>
            <p style={{fontSize: "12px", fontStyle: "italic"}}>Dirección de carpeta en el repositorio donde se cargarán las pruebas en Jira</p>
            <Form.Control name='repository' onChange={handleTextChange} type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Negocio</Form.Label>
            <p style={{fontSize: "12px", fontStyle: "italic"}}>Nombre de Negocio como aparece en Jira</p>
            <Form.Control name='area' onChange={handleTextChange} type="text" />
          </Form.Group>
          <div className="d-flex justify-content-center">
          <Button style={{ backgroundColor: "#5280e3" }} disabled={loading} className="mt-3 " variant="primary" type="submit">
           {loading ? 'Enviando......' : 'Generar Casos de Prueba'} 
          </Button>
          </div>
        </Form>
  )
}

export default InputDataForm