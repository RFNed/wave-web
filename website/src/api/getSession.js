export async function getSessionProfile() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        method: "GET",
        credentials: "include"
    })

    const data = await res.json()

    if (!res.ok)
    {
        throw new Error(data.detail)
    }

    const id = data.profile_id
    const res_profile = await fetch(`${import.meta.env.VITE_API_URL}/profile?id=${id}`, {
        method: "GET"
    })
    
    const data_profile = await res_profile.json()

    if (!res_profile.ok)
    {
        throw new Error(data_profile.detail)
    }


    return data_profile
}