import "./Profile.css"
import { getProfile } from "../../utils/getProfile"
import { getImageUrl } from "../../utils/getImage"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { useAuth } from "../../utils/authContext"

export default function Profile() {
    const { user, setCanTouchMy } = useAuth()
    const [isLoadedAvatar, setAvatarBool] = useState(false)
    const [isLoadedBanner, setBannerBool] = useState(false)
    const [url_banner, setBanner] = useState("")
    const [url_avatar, setAvatar] = useState("")
    const [nickname, setNickname] = useState("")
    const [description, setDescription] = useState("")
    const [optionButton, setOptionButton] = useState(false)
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")

    useEffect(() => {
        const getProfileVar = async () => {
            try {
                
                if (id) {
                    const data = await getProfile(id)
                    setBanner(getImageUrl(data.banner_url))
                    setAvatar(getImageUrl(data.avatar_url))
                    setNickname(`${data.username}`)
                    setDescription(`${data.description}`)
                }
                else {
                    if (!user) return
                    setBanner(getImageUrl(user.banner_url))
                    setAvatar(getImageUrl(user.avatar_url))
                    setNickname(`${user.username}`)
                    setDescription(`${user.description}`)
                    setOptionButton(true)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getProfileVar()
    }, [id, user])

    return (
        <>

        <div className="profile-box">

            <div className="profile-header-banner">
                <img src={url_banner || undefined} onLoad={() => setBannerBool(true)} />
            </div>

            <div className="profile-avatar">
                <div className="profile-avatar-wrapper" style={{display: "flex"}}>
                    <img src={url_avatar || undefined} onLoad={() => setAvatarBool(true)} className={`avatar ${isLoadedAvatar ? "loaded" : ""}`}/>
                </div>
                <div className="player-info">
                    <span className="profile-nickname">
                        {nickname}
                    </span>
                </div>
                {optionButton && (<Link to="settings" style={{textDecoration: "none", color: "white"}}>
                <div className="options-button" onClick={() => window.scrollTo({top: "0", behavior: "smooth"})}>
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