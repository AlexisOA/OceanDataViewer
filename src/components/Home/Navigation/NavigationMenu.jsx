import React, {useState} from 'react';
import '../Navigation/NavigationMenu.css'
import logo from '../../../assets/images/logo_laplocan.png'
import {useNavigate} from 'react-router-dom';

const NavigationMenu = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const navigate = useNavigate();
    
    const redirectToPath = (path) => {
    navigate(path)
    }


    return (
        <nav className="navigation">
            <a href="/" className="brand-name">
                <img src={logo} alt="logo_plocan"></img>
            </a>
            <button className="hamburger"
            onClick={() => {setIsNavExpanded(!isNavExpanded);}}>
                {/* icon from heroicons.com */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="white"
                >
                <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                />
                </svg>
            </button>
            <div className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }>
                <ul>
                    <li>
                    <a href="/estoc">Fixed observatories</a>
                    </li>
                    <li>
                    <a href="/gliders">Autonomous systems</a>
                    </li>
                    <li>
                    <a href="http://obsplatforms.plocan.eu/" Target="_blank">Data portal</a>
                    </li>
                    <li>
                    <a href="#">Contact us</a>
                    </li>
                </ul>
            </div>
    </nav>
    );
}

export default NavigationMenu;