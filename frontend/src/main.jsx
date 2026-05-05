import { StrictMode, useEffect } from 'react'
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
import { AuthProvider, useAuth } from './utils/authContext.jsx'
import { getSessionProfile } from './api/getSession.js'
import './index.css'
import { getImageUrl } from './utils/getImage.js'
import Settings from './pages/Profile/Settings/Settings.jsx'

function Header() {
  const { user, loading } = useAuth()
  const location = useLocation()
  const canTouchMy = 
    location.pathname === "/profile" && !location.search
  return (
    <>
      <header>
        <div className='headerbox'>
              <Link to="/"><img src="/logo/wave.svg" alt="Logo" className='logo'/></Link>
              <div className="right-board">
              <Link to="/maps" className="buttons"><img src="/assets/icons/music.svg"/>Карты</Link>
              <Link to="/leaderboard" className="buttons"><img src="/assets/icons/leaderboards.svg"/>Лидерборд</Link>
              
              {loading ? (
                <div className="avatar-skeleton" />
              ) : user ? (
                canTouchMy ? (
                <img src={getImageUrl(user.avatar_url)} onClick={() => window.scrollTo({top: "0", behavior: "smooth"})} className='avatar-header-profile'/>
                ) : (<Link to={`/profile`}><img src={getImageUrl(user.avatar_url)} className='avatar-header-profile'/></Link>)
              ) : (
                <Link to="/auth" className="buttons">
  <img src="/assets/icons/auth.svg"/>
  Войти
</Link>
              )}
            </div>
        </div>
      </header>
    </>
  )
}


function AnimatedRoutesAnimation() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search}
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
        <Route path="/profile/settings" element={<Settings />} />
      </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

async function bootstrap()
{
  let user = null
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider initialUser={user}>
            <Header />
            <AnimatedRoutesAnimation />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>,
  )

}

bootstrap()
