// import WOM from '../assets/WOM.png'
import AVATTAR from '../assets/avattar.webp'
import './lay-out.css'



const NavBar = () => {
  return (
    <nav className="nav">
      <img className="logo" src={AVATTAR} alt="wom-logo" />
      {/* <img src={WOM} alt="wom-logo" width="120" height="100" /> */}
    </nav>
  )
}

export default NavBar