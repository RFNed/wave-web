export async function verifyJs(token) 
{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token
        })
    })



    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.detail || "Ошибка")
    }

    return data

}