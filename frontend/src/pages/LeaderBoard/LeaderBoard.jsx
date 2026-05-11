import "./LeaderBoard.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getImageUrl } from "../../utils/getImage";
import { useAuth } from "../../utils/authContext";

export default function LeaderBoard()
{
    const { user } = useAuth()

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function load()
        {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard`);
            const data = await res.json();
            setPlayers(data);
        }

        load();
        
        
    }, [])

    return (

        <>
        
        <div className="lead-box">
            <div className="lead-title">
                Лучшие 50 игроков
            </div>

            <div className="lead-list">
                {players.map(player => (
                <Link to={player.id === user?.id ? `/profile` : `/profile?id=${player.id}`} style={{ textDecoration: "none" }}>
                    <div className="player" key={player.id}>
                        <img src={getImageUrl(player.avatar)}/>
                        
                        <span className="leader-name">
                            {player.username}
                        </span>
                        
                        <span className="leader-value">
                            {player.score_value}
                        </span>
                    </div>
                </Link>
                ))}



            </div>
        </div>
        
        </>

    )
}