import "./Profile.css"
import { getProfile } from "../../utils/getProfile"
import { getImageUrl } from "../../utils/getImage"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { useAuth } from "../../utils/authContext"

export default function Profile() {
    const { user } = useAuth()
    const [isLoadedAvatar, setAvatarBool] = useState(false)
    const [isLoadedBanner, setBannerBool] = useState(false)
    const [url_banner, setBanner] = useState("")
    const [url_avatar, setAvatar] = useState("")
    const [nickname, setNickname] = useState("")
    const [description, setDescription] = useState("")
    const [optionButton, setOptionButton] = useState(false)
    useEffect(() => {
        const getProfileVar = async () => {
            try {
                const id = new URLSearchParams(window.location.search).get("id")
                const data = await getProfile(id)

                setBanner(getImageUrl(data.banner_url))
                setAvatar(getImageUrl(data.avatar_url))
                setNickname(`${data.username}`)
                setDescription(`${data.description}`)
                if (user && user.id == data.id)
                {
                    setOptionButton(true)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getProfileVar()
    }, [])

    return (
        <>

        <div className="profile-box">

            <div className="profile-header-banner">
                <img src={url_banner} onLoad={() => setBannerBool(true)} />
            </div>

            <div className="profile-avatar">
                <div className="profile-avatar-wrapper" style={{display: "flex"}}>
                    <img src={url_avatar} onLoad={() => setAvatarBool(true)} className={`avatar ${isLoadedAvatar ? "loaded" : ""}`}/>
                </div>
                <div className="player-info">
                    <span className="profile-nickname">
                        {nickname}
                    </span>
                    <span className="profile-registered">Дата регистрации: август 2017</span>
                    <span className="profile-last-online">В сети</span>
                </div>
                {optionButton && (<Link to="settings" style={{textDecoration: "none", color: "white"}}><div className="options-button">
                    Настройки
                </div></Link>)}
            </div>

            
            
            <div className="profile-description">
                <span className="description-header">Про меня!</span>
                <div className="description-mysql">
                    {description}
                </div>
            </div>
        </div>

        </>
    )
}