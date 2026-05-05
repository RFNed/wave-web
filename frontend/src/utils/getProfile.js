export async function getProfile(id)
{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/profile?id=${id}`)
    const data = await res.json()
    if (!res.ok)
        throw new Error(data.detail || "Ошибка")
    return data
}