import React, {useState} from "react";
import "./NavigationMenu.css"
import logo from '../../../assets/images/logo_laplocan.png'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return(
        <div className="navbar">
            <div className="nav_logo"> 
                <a href="/" className="brand-name">
                    <img src={logo} alt="logo_plocan"></img>
                </a>
            </div>
            <div className={`nav_items ${isOpen && "open"}`}>
                <a href="/fixedobs">Fixed Observatory</a>
                <a href="/gliders">Autonomous systems</a>
                <a href="http://obsplatforms.plocan.eu/" target="_blank">Data Portal</a>
                <a href="#">Contact</a>
            </div>
            <div className={`nav_toggle ${isOpen && "open"}`} onClick={ () => setIsOpen(!isOpen)} >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
export default Navbar