
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

            <div className="map-container">
                <div className="map-item">
                    <div className="map-item img-container">
                        1
                    </div>
                    <div className="map-item-description">
                        <span>Tsukinami</span>
                        <span>Wakeshima Kanon</span>
                        <span>RFNed</span>
                    </div>
                </div>
            </div>

        </div>
        
        </>
    )
}