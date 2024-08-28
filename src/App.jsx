import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Gpt from './pages/gpt'
import ThreatId from './pages/threat-id'
import LayOut from './components/lay-out'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LayOut><Gpt /></LayOut>} exact/>
        <Route path="/threat/:threatId" element={<LayOut><ThreatId /></LayOut>} />
      </Routes>
    </Router>
  )
  
}

export default App
