import "./verify.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
export default function Verify() {
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    useEffect(() => {
        const verify = async () => {
            try {
                const token = new URLSearchParams(window.location.search).get("token")

                if (token == null)
                {
                    setLoading(false)
                    setMessage("Недействительный токен")
                }

                

            } catch (e)
            {
                console.log(e)
            }
        }

        verify()
    }, [])

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

            {loading ? (
                <div className="loader"></div>
            ) : (
                <div className="text-d">{message}</div>
            )}


        </>
    )
}