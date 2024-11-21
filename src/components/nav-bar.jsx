// import WOM from '../assets/WOM.png'
import { Button, Form } from 'react-bootstrap'
import AVATTAR from '../assets/avattar.webp'
import './lay-out.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const NavBar = () => {

  const [key, setKey] = useState('')
  const navigate = useNavigate()
  const handleGetApiKey = (e) => {
    e.preventDefault();
    localStorage.setItem('key', key);
    alert('Autenticad@ con exito')
    setKey('')
    window.location.reload()
  
  };

   
  const handleLogout = () => {
    localStorage.clear();
    alert('Sesión cerrada con exito')
    setKey('');
    navigate('/')
    window.location.reload()
  };

  const isApiKey = localStorage.getItem('key')
  
  return (
    <nav className={isApiKey ? 'nav' : 'not-nav'}>
      <img className="logo" src={AVATTAR} alt="wom-logo" />
      
      {
       !isApiKey ?
        <Form onSubmit={handleGetApiKey} className="d-flex align-items-center ">
          <Form.Control required className='nav-input' value={key} disabled={isApiKey} name='key' onChange={(e) => setKey(e.target.value)}  type="text" />
          <Button 
            className='login'
            type="submit" 
            variant="primary">
              Ingresar
          </Button> 
        </Form> 
        :
        < div className="d-flex align-items-center gap-3">
       <Link style={{textDecoration: 'none', color: 'white', fontSize: '20px'}} to="/audit">Auditoria</Link>
       <Button 
          className='logout' 
          variant="primary" 
          onClick={handleLogout}>Cerrar sesión
        </Button> 
        </div>
      }
    </nav>
  )
}

export default NavBar