import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import App from './assets/Main/Main.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
