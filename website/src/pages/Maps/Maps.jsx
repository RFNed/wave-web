
import { Link } from "react-router-dom"
export default function Maps() {
    return (
        <>
        
        <div className='headerbox'>
            <Link to="/"><img src="/icons/wave.svg" alt="Logo"/></Link>
            <div className="right-board">
            <Link to="/maps" className="buttons"><img src="/assets/music.svg"/>Карты</Link>
            <Link to="/records" className="buttons"><img src="/assets/leaderboards.svg"/>Лидерборд</Link>
            </div>
        </div>
        
        </>
    )
}