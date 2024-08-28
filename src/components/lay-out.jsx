import Footer from './footer'
import './lay-out.css'
import NavBar from './nav-bar'

const LayOut = ({children}) => {
  return (
    <div className="page-container">
      <header>
        <NavBar />
      </header>
      <main className="w-100 p-5 d-flex justify-content-center bg-light bg-gradient">
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default LayOut