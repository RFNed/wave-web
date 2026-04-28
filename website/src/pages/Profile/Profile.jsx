import "./Profile.css"
export default function Profile() {
    return (
        <>

        <div className="profile-box">

            <div className="profile-header-banner">
                <img src="/template_banner.jpg"/>
            </div>

            <div className="profile-avatar">
                <img src="template.png"/>
                <div className="player-info">
                    <span className="profile-nickname">
                        TEMA LAL666
                    </span>
                    <span className="profile-registered">Дата регистрации: август 2017</span>
                    <span className="profile-last-online">В сети</span>
                </div>
            </div>

            
            <div className="profile-description">
                <span className="description-header">Про меня!</span>
                <div className="description-mysql">
                    Пользователь не оставил здесь ничего :(
                </div>
            </div>
        </div>

        </>
    )
}