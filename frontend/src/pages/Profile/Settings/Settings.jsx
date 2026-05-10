import { useEffect, useState } from "react"
import "./Settings.css"
import { useAuth } from "../../../utils/authContext"
import { getImageUrl } from "../../../utils/getImage"
import { changeAvatar } from "./utils/changeAvatar"
import { useNavigate } from "react-router-dom"

export default function Settings() {
    const { user, RefreshSignal } = useAuth()
    const [URLAvatar, setURLAvatar] = useState("")
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState("")
    const [notify, setNotify] = useState(`${`  `}`)
    const navigate = useNavigate()


    function onSendAvatar()
    {
        if (!URLAvatar && !file)
        {
            alert("Вставьте в поле ссылку или выберите файл!")
            return
        }

        if (URLAvatar && !file)
        {

            const url_switcher = async() => {
                const result = await changeAvatar(true, URLAvatar)
                if (result.message === "Avatar updated successfully")
                {
                    setNotify("Аватар успешно обновлен!")
                    RefreshSignal(true)
                }
                else {
                    alert("Произошла ошибка при обновлении аватара. Убедитесь, что ссылка действительна и ведет на изображение.")
                    return
                }
            }

            url_switcher()

            
        } else if (file && !URLAvatar)
        {
            const url_switcher = async() => {
                const result = await changeAvatar(false, file)
                if (result.message === "Avatar updated successfully")
                {
                    setNotify("Аватар успешно обновлен!")
                    RefreshSignal(true)
                }
                else {
                    alert("Произошла ошибка при обновлении аватара. Попробуйте еще раз.")
                    return
                }
            }
            url_switcher()
        }



        setURLAvatar("")
        setFile(null)
        setPreview(getImageUrl(user.avatar_url))

        return;
    }


    useEffect(() => {
        if (user?.avatar_url) {
            setPreview(getImageUrl(user.avatar_url))
        }
        else {
            navigate("/")
        }
    }, [user])

    const handleUrlChange = (e) => {
        const url = e.target.value

        setURLAvatar(url)
        setFile(null)
        setPreview(url)
        setNotify("")
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (!selectedFile) return

        const maxSize = 2 * 1024 * 1024
        if (selectedFile.size > maxSize) {
            alert("Размер файла превышает 2 МБ. Пожалуйста, выберите файл поменьше.")
            e.target.value = ""
            return
        }



        setFile(selectedFile)
        setURLAvatar("")


        const objectURL = URL.createObjectURL(selectedFile)
        setPreview(objectURL)
        setNotify("")
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
                            <input type="file" onChange={handleFileChange} accept="image/jpeg" id="file-avatar"/>
                            <div className="on-send-avatar" onClick={onSendAvatar}>Применить</div>
                            <div className="notify-message-settings-avatar">{notify}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}