import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from './pages/Main/Main.jsx'
import Maps from "./pages/Maps/Maps.jsx"
import Auth from "./pages/Auth/Auth.jsx"
import Records from './pages/Records/Records.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/maps" element={<Maps />}/>
        <Route path="/" element={<App />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
