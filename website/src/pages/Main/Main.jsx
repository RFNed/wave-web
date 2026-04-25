
import { Link } from 'react-router-dom';
import './main.css';
export default function App() {
    return (
        <>
        <div className="content">
            <div className="content-head">
                <h1 className='title'>Wave</h1>
                <span className='desc'>Новая ритм игра - с уникальным геймплеем и красивой графикой!</span>
                <Link to="/maps" className='download'>Windows x64</Link>
                <div className="totto" title="Mascot Totto"></div>
            </div>
        </div>

        </>
    );
}