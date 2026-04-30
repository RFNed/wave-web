import "./auth.css"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { toAuth } from "../../api/auth"
import { useAuth } from "../../utils/authContext.jsx"
export default function Auth() {

    const [notifyText, setNotify] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        setNotify("")
    }, [nickname, password])

    async function toLogin()
    {
        if (!nickname || !password)
        {
            setNotify("Заполните все поля")
            return
        }

        const data = await toAuth(nickname, password)
        if (data.result == "granted")
        {
            setNotify("OK!")
            setUser({user_id: data.id})
        } else if (data.result == "wrong") {
            setNotify("Неправильный пароль")
        } else if (data.result == "not exist") {
            setNotify("Не существует аккаунт")
        }

    }

    return (
        <>

        <div className='authbox'>
            <span className="title-pass">
                С возвращением!
            </span>
            <div className="authform">
                <div className="field">
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={15} id="login" placeholder="никнейм"></input>
                </div>
                <div className="field">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={15} id="login" placeholder="пароль"></input>
                </div>
                <div className="login-button" onClick={toLogin}>    
                    <span className="text">
                        Войти
                    </span>
                    <img src="/assets/icons/key.svg"/>
                </div>
                <Link to="/register" className="login-button" id="register">    
                    <span className="text">
                        Создать аккаунт
                    </span>
                    <img src="/assets/icons/auth.svg"/>
                </Link>
                    <span id="result">
                        {notifyText}
                    </span>

            </div>


        </div>
        
        </>
    )
}