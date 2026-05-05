import "./verify.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { verifyJs } from "../../api/verify"
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
                    setMessage("Привет, это страница верификации!")
                    return
                }

                const result = await verifyJs(token)

                if (result.status == 200)
                {
                    setLoading(false)
                    setMessage("Можете закрыть эту страницу, и войти в аккаунт!")
                } else {
                    setLoading(false)
                    setMessage("Такого токена не существует")
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

            {loading ? (
                <div className="loader"></div>
            ) : (
                <div className="text-d">{message}</div>
            )}


        </>
    )
}