import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Gpt from './pages/gpt'
import ThreatId from './pages/threat-id'
import LayOut from './components/lay-out'
import Audit from './pages/audit'
import AuditNew from './pages/audit-new'
import { ThreatProvider } from './contexts/threath-provider'

function App() {
  return(
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<ThreatProvider><LayOut><Gpt /></LayOut></ThreatProvider>} exact/>
        <Route path="/threat/:threatId/run/:runId" element={<LayOut><ThreatId /></LayOut>} />
        <Route path="/audit" element={<ThreatProvider><LayOut><Audit /></LayOut> </ThreatProvider>} />
        <Route path="/audit/new/threat/:threatId/run/:runId" element={<LayOut><AuditNew /></LayOut>} />
      </Routes>
    </Router>
  )
  
}

export default App
