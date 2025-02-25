import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Res1 from './components/Res1/Res1';
import Login from './components/Login-user/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Res1 />} />
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </Router>
    
  )
}

export default App
