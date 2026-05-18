
import { Link } from 'react-router-dom';
import './main.css';
import { Helmet } from 'react-helmet-async';
export default function App() {
    return (
        <>
        <Helmet>
            <title>Wave</title>
        </Helmet>
        <div className="content">
            <div className="content-head">
                <h1 className='title'>Wave</h1>
                <span className='desc'>Новая ритм игра - с уникальным геймплеем и красивой графикой!</span>
                <a href="https://github.com/RFNed/wave-godot/" target="_blank" rel="noopener noreferrer" className='download'>Windows x64</a>
                <div className="totto" title="Mascot Totto"></div>
            </div>
        </div>

        </>
    );
}