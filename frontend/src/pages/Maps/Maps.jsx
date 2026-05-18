
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Maps.css"
import { Helmet } from "react-helmet-async"
import { getImageUrl } from "../../utils/getImage"
import { useAuth } from "../../utils/authContext"
export default function Maps() {
    const [search, setSearch] = useState("")
    
    const { user } = useAuth()
    const [maps, setMaps] = useState([])

    useEffect(() => {

        const timeout = setTimeout(async () => {

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/getmaps?search=${search}`
            )

            const data = await res.json()
            setMaps(data)

        }, 200)

        return () => clearTimeout(timeout)

    }, [search])

    return (
        <>
        <Helmet>
            <title>Карты</title>
        </Helmet>
        <div className="map-content">

            <div className="map-search-container">
                <input className="map-search-input" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>

            <div className="map-container">
                {maps.map(maps => (
                    <div className="map-item">
                        <div className="map-item img-container">
                            <img src={maps.cover_url} />
                        </div>
                        <div className="map-item-description">
                            <span>{maps.title}</span>
                                <span>{maps.author}</span>
                            <Link style={{textDecoration: "none", color: "white"}} to={maps.creator_id == user?.id ? (`/profile`) : (`/profile?id=${maps.creator_id}`)}>
                                <div id="sub-author">
                                    <img src={getImageUrl(maps.author_url)}/>
                                    <span>{maps.nickname_creator}</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}

            </div>

        </div>
        
        </>
    )
}