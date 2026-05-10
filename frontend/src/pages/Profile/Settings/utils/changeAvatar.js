export async function changeAvatar(isURL, argument)
{
    if (isURL)
    {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/changeAvatar/URL`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                argument: argument
            })
        })
        if (res.ok)
        {
            return res.json()
        }
        else {
            return false
        }
    } else if (!isURL)
    {
        const formData = new FormData()

        formData.append("avatar", argument)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/changeAvatar/file`, {
            method: "POST",
            credentials: "include",
            body: formData
        })
        if (res.ok)
        {
            return res.json()
        }
        else {
            return false
        }
    }
}

export async function changeBanner(isURL, argument)
{
    if (isURL)
    {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/changeBanner/URL`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                argument: argument
            })
        })
        if (res.ok)
        {
            return res.json()
        }
        else {
            return false
        }
    } else if (!isURL)
    {
        const formData = new FormData()

        formData.append("avatar", argument)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/changeBanner/file`, {
            method: "POST",
            credentials: "include",
            body: formData
        })
        if (res.ok)
        {
            return res.json()
        }
        else {
            return false
        }
    }
}