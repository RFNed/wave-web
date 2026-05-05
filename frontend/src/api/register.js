export async function registerUser(email, nickname, password)
{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/reg`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            nickname,
            password
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.detail || "Ошибка")
    }


    return data
}