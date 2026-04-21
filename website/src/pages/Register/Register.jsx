import "./register.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { registerUser } from "../../api/register"
export default function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        setError("")
    }, [email, nickname, password, repeatPassword])

    async function sendRegister()
    {
        if (!email || !nickname || !password || !repeatPassword)
        {
            setError("Заполните все поля")
            return
        }

        if (!(password == repeatPassword))
        {
            setError("Пароли не совпадают")
            return
        }

        try {
            const data = await registerUser(email, nickname, password)
            navigate("/register/check")
            
        } catch (err)  {
            setError(err.message)
        }

    }

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

        <div className='authbox'>
            <span className="title-pass">
                Совсем немного
            </span>
            <div className="authform">
                <div className="field">
                    <input type="email" value={email} maxLength={50} id="email" placeholder="почта" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="field">
                    <input type="text" value={nickname} maxLength={15} id="nickname" placeholder="никнейм" onChange={(e) => setNickname(e.target.value)}></input>
                </div>
                <div className="field">
                    <input type="password" value={password} maxLength={50} id="pass" placeholder="пароль" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="field">
                    <input type="password" value={repeatPassword} maxLength={50} id="reg" placeholder="повторите пароль" onChange={(e) => setRepeatPassword(e.target.value)}></input>
                </div>
                <div className="login-button" id="buttonLogin" onClick={sendRegister}>    
                    <span className="text">
                        Зарегистрироваться
                    </span>
                    <img src="/assets/icons/auth.svg"/>
                </div>
                <div className={`error ${error ? "show" : ""}`}>
                    {error}
                </div>
            </div>


        </div>
        
        </>
    )
}

