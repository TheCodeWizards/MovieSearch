import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './compnents/Header'
import Footer from './compnents/Footer'

function App() {

  return (
    <div className=''>
      <Header/>
      <Outlet />
      <Footer/>

    </div>

  )
}

export default App
