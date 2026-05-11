
import { Link } from "react-router-dom"
import svgSearch from "/assets/icons/search.svg?react"
import "./Maps.css"
export default function Maps() {
    return (
        <>
        
        <div className="map-content">

            <div className="map-search-container">
                <input className="map-search-input"/>
                <button className="map-search-button"><div className="fas fa-search" id="search" /></button>
            </div>
        </div>
        
        </>
    )
}