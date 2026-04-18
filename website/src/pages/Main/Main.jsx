import { NavLink } from 'react-router';
import './index.css';
export default function App() {
    return (
        <>

        <link rel="icon" href="/icons/wave.svg" />

        <div className='headerbox'>
            <img src="/icons/wave.svg" alt="Logo" />
        </div>

        <div className="content">
            <div className="content-head">
                <h1 className='title'>Wave</h1>
                <span className='desc'>Новая ритм игра - с уникальным геймплеем и красивой графикой!</span>
                <div className="download">Windows x64</div>
                <div className="totto" title="Mascot Totto"></div>
            </div>
        </div>

        </>
    );
}