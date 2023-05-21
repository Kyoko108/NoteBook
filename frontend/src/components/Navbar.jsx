
import React, { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { ImExit} from "react-icons/im";
import { MdAccountCircle} from "react-icons/md";

import "./componentStyle/Navbar.css";

function Navbar() {
    const navRef = useRef();
    const navigate = useNavigate();

    const location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };


    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    return (
        <header>
        <div >
            <h3 className="logo">NOTEBOOK</h3>
            <nav ref={navRef}>
                <Link to="/#" className="underline-hover-effect">Home</Link>
                <Link to="/notes" className="underline-hover-effect" >Your Notes</Link>
                <Link to="/" className="underline-hover-effect">Add Notes</Link>
                <Link to="/about" className="underline-hover-effect">About</Link>
                 
                  { (localStorage.getItem("token") && localStorage.getItem("name")) ? (
                    <Link  className="underline-hover-effect username"><MdAccountCircle className="userIcon" />{localStorage.getItem("name")}</Link>
                            
                        ) : (
                            ""
                        )}
                

                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>

            </nav>
            </div>

            <div>

             {!localStorage.getItem("token") ? (
                    <div className="authbuttons">
                        <button className="auth-btn auth"><Link to="/login">Login</Link></button>
                        <button className="auth-btn auth"><Link to="/signup">SignUp</Link></button>
                    </div>
                ) : (
                    <div className="authbuttons">
                        <button className="auth-btn" onClick={handleLogout}><Link to="/login">Logout <ImExit /> </Link></button>
                    </div>
                )}

         
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
            </div>
        </header>
    );
}

export default Navbar;