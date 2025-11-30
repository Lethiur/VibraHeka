import { Link } from "react-router-dom";
import './Navbar.scss'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg px-3">
            <Link className="navbar-brand" to="/">
                <img
                    src="http://vibraheka.com/wp-content/uploads/2025/09/logo-vibrakeca3-1__1_-removebg-preview-1.png"
                    alt="Logo"
                    style={{ width: "48px", height: "48px", marginRight: "8px" }}
                />
                VibraHeka
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Inicio
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/terapeutas">
                            Terapeutas
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
