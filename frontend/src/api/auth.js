export async function toAuth(nickname, password)
{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nickname,
            password
        }),
        credentials: "include"
    })

    const data = await res.json()

    if (!res.ok) 
    {
        throw new Error(data.detail || "Error")
    }

    return data
} 