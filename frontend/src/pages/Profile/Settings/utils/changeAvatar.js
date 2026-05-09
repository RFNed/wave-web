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
            return true
        }
        else {
            return false
        }
    }
}