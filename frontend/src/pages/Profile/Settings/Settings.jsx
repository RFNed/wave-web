import { useEffect, useState } from "react"
import "./Settings.css"
import { useAuth } from "../../../utils/authContext"
import { getImageUrl } from "../../../utils/getImage"
import { changeAvatar } from "./utils/changeAvatar"

export default function Settings() {
    const { user } = useAuth()
    const [URLAvatar, setURLAvatar] = useState("")
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState("")
    const [notify, setNotify] = useState(`${`  `}`)

    function onSendAvatar()
    {
        if (!URLAvatar && !file)
        {
            alert("Вставьте в поле ссылку или выберите файл!")
        }

        if (URLAvatar && !file)
        {
            const url_switcher = async() => {
                await changeAvatar(true, URLAvatar)
            }
            url_switcher()
        }

        return;
    }


    useEffect(() => {
        if (user?.avatar_url) {
            setPreview(getImageUrl(user.avatar_url))
        }
    }, [user])

    const handleUrlChange = (e) => {
        const url = e.target.value

        setURLAvatar(url)
        setFile(null)
        setPreview(url)
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (!selectedFile) return

        setFile(selectedFile)
        setURLAvatar("")

        const objectURL = URL.createObjectURL(selectedFile)
        setPreview(objectURL)
    }

    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview)
            }
        }
    }, [preview])

    return (
        <>
        
        <div className="settings-box">
            <span className="settings-title">Настройки</span>
            <div className="settings-constructor">
                <div className="avatar-editor">
                    <div className="header-avatar-editor">
                        <img src={`${preview}`} style={{marginBottom: "70px"}}/>
                        <div className="avatar-editor-list-option">
                            <span>Поменяйте свою аватарку!</span>
                            <input type="url" value={`${URLAvatar}`} onChange={handleUrlChange} maxLength={"100"} placeholder="Вставьте прямую ссылку на картинку" id="url-avatar"></input>
                            <span style={{fontSize: "14px", paddingTop: "4px", opacity: "0.2"}}>или</span>
                            <input type="file" onChange={handleFileChange} accept="image/png, image/jpeg" id="file-avatar"/>
                            <div className="on-send-avatar" onClick={onSendAvatar}>Применить</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}