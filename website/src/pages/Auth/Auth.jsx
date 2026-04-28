import "./auth.css"
import { Link } from 'react-router-dom'

export default function Auth() {
    return (
        <>

        <div className='authbox'>
            <span className="title-pass">
                С возвращением!
            </span>
            <div className="authform">
                <div className="field">
                    <input type="text" maxLength={15} id="login" placeholder="никнейм"></input>
                </div>
                <div className="field">
                    <input type="password" maxLength={15} id="login" placeholder="пароль"></input>
                </div>
                <div className="login-button">    
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
                        
                    </span>

            </div>


        </div>
        
        </>
    )
}