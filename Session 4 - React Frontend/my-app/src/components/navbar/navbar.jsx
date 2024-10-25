import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">Put your website name here</div>
            <ul className="nav-links">
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
