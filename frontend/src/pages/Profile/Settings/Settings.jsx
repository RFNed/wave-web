import { useEffect, useState } from "react"
import "./Settings.css"
import { useAuth } from "../../../utils/authContext"
import { getImageUrl } from "../../../utils/getImage"
import { changeAvatar, changeBanner } from "./utils/changeAvatar"
import { useNavigate } from "react-router-dom"

export default function Settings() {
    const { user, RefreshSignal } = useAuth()


    const [description, setDescription] = useState(user?.description || "")
    const [editDescription, setEditDescription] = useState(false)
    const [draftDescription, setDraftDescription] = useState(description)

    const MAX = 200;

    const [bannerURL, setBannerURL] = useState("")
    const [previewbanner, setPreviewBanner] = useState("")
    const [fileBanner, setFileBanner] = useState(null)
    const [notifyBanner, setNotifyBanner] = useState(`${`  `}`)


    const [URLAvatar, setURLAvatar] = useState("")
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState("")
    const [notify, setNotify] = useState(`${`  `}`)
    const navigate = useNavigate()

    function onSendBanner() {
    if (!bannerURL && !fileBanner) {
        alert("Вставьте ссылку или выберите файл!")
        return
    }

    const run = async () => {
        const result = bannerURL
            ? await changeBanner(true, bannerURL)
            : await changeBanner(false, fileBanner)

        if (result?.message === "Banner updated successfully") {
            setNotifyBanner("Баннер успешно обновлён!")
            RefreshSignal(true)
        } else {
            alert("Ошибка обновления баннера")
        }
    }

        run()

    setBannerURL("")
    setFileBanner(null)
    }

    function onSendAvatar()
    {
        if (!URLAvatar && !file) {
            alert("Вставьте ссылку или выберите файл!")
            return
        }

        const run = async () => {
            const result = URLAvatar
                ? await changeAvatar(true, URLAvatar)
                : await changeAvatar(false, file)

            if (result?.message === "Avatar updated successfully") {
                setNotify("Аватар успешно обновлён!")
                RefreshSignal(true)
            } else {
                alert("Ошибка обновления аватара")
            }
        }

        run()

        setURLAvatar("")
        setFile(null)
    }

    useEffect(() => {
        return () => {
            if (previewbanner?.startsWith("blob:")) {
                URL.revokeObjectURL(previewbanner)
            }
        }
    }, [previewbanner])
    useEffect(() => {
        if (user?.avatar_url && user?.banner_url) {
            setPreview(getImageUrl(user.avatar_url))
            setPreviewBanner(getImageUrl(user.banner_url))
        }
        else {
            navigate("/")
        }
    }, [user])

    const handleUrlChange = (e) => {
        const url = e.target.value

        setURLAvatar(url)
        setFileBanner(null)
        setPreview(url)
        setNotify("")
    }

    const handleUrlChangeBanner = (e) => {
        const url = e.target.value

        setBannerURL(url)
        setFile(null)
        setPreviewBanner(url)
        setNotify("")
    }

    const handleFileChangeBanner = (e) => {
        const selectedFile = e.target.files[0]
        if (!selectedFile) return

        const maxSize = 2 * 1024 * 1024
        if (selectedFile.size > maxSize) {
            alert("Размер файла превышает 2 МБ. Пожалуйста, выберите файл поменьше.")
            e.target.value = ""
            return
        }
        setFileBanner(selectedFile)
        setBannerURL("")


        const objectURLBanner = URL.createObjectURL(selectedFile)
        setPreviewBanner(objectURLBanner)
        setNotifyBanner("")
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
                <div className="settings-head-avatar-banner">
                    <span className="attention-text-image">* Изображение должны быть формата JPG/JPEG и быть не более 2 МБ!</span>
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
                    <div className="banner-editor">
                        <div className="header-banner-editor">
                            <img src={`${previewbanner}`} style={{marginBottom: "70px"}}/>
                            <div className="avatar-editor-list-option">
                                <span>Поменяйте свой баннер!</span>
                                <input type="url" value={`${bannerURL}`} onChange={handleUrlChangeBanner} maxLength={"100"} placeholder="Вставьте прямую ссылку на картинку" id="url-avatar"></input>
                                <span style={{fontSize: "14px", paddingTop: "4px", opacity: "0.2"}}>или</span>
                                <input type="file" onChange={handleFileChangeBanner} accept="image/jpeg" id="file-avatar"/>
                                <div className="on-send-avatar" onClick={onSendBanner}>Применить</div>
                                <div className="notify-message-settings-avatar">{notifyBanner}</div>
                            </div>
                        </div>
                    </div>
                </div>
                12333
            </div>
        </div>
        
        </>
    )
}