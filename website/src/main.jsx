import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import App from "./pages/Main/Main.jsx"
import Maps from "./pages/Maps/Maps.jsx"
import Auth from "./pages/Auth/Auth.jsx"
import Records from "./pages/Records/Records.jsx"
import Register from "./pages/Register/Register.jsx"
import Verify from './pages/Verification/Verify.jsx'
import CheckEmail from './pages/Register/Check/Check.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/maps" element={<Maps />}/>
        <Route path="/" element={<App />} />
        <Route path="/records" element={<Records />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/register/check" element={<CheckEmail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
