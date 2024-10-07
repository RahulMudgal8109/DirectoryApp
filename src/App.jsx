import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import Navbar2 from './component/Navbar2'
import { Routes, Route } from 'react-router-dom';
import HomePage from './component/HomePage'
import RetrievePage from './component/RetrievePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Navbar/>
    <Navbar2/>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/retrive" element={<RetrievePage/>} />
      </Routes>
      
    </>
  )
}

export default App
