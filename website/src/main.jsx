import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import App from "./pages/Main/Main.jsx"
import Maps from "./pages/Maps/Maps.jsx"
import Auth from "./pages/Auth/Auth.jsx"
import Register from "./pages/Register/Register.jsx"
import Verify from './pages/Verification/Verify.jsx'
import CheckEmail from './pages/Register/Check/Check.jsx'
import LeaderBoard from './pages/LeaderBoard/LeaderBoard.jsx'
import Profile from './pages/Profile/Profile.jsx'
import './index.css'

function Header() {
  return (
    <>
    
      <div className='headerbox'>
          <Link to="/"><img src="/logo/wave.svg" alt="Logo" className='logo'/></Link>
          <div className="right-board">
          <Link to="/maps" className="buttons"><img src="/assets/icons/music.svg"/>Карты</Link>
          <Link to="/leaderboard" className="buttons"><img src="/assets/icons/leaderboards.svg"/>Лидерборд</Link>
          <Link to="/auth" className="buttons"><img src="/assets/icons/auth.svg"/>Войти</Link>
          </div>
      </div>
    
    </>
  )
}

function AnimatedRoutesAnimation() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.2 }}
      >
      <Routes location={location}>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/maps" element={<Maps />}/>
        <Route path="/" element={<App />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/register/check" element={<CheckEmail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <AnimatedRoutesAnimation />
    </BrowserRouter>
  </StrictMode>,
)
