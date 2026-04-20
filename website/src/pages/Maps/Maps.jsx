
import { Link } from "react-router-dom"
export default function Maps() {
    return (
        <>
        
        <div className='headerbox'>
            <Link to="/"><img src="/logo/wave.svg" alt="Logo" className='logo'/></Link>
            <div className="right-board">
            <Link to="/maps" className="buttons"><img src="/assets/icons/music.svg"/>Карты</Link>
            <Link to="/records" className="buttons"><img src="/assets/icons/leaderboards.svg"/>Лидерборд</Link>
            <Link to="/auth" className="buttons"><img src="/assets/icons/auth.svg"/>Войти</Link>
            </div>
        </div>
        
        </>
    )
}