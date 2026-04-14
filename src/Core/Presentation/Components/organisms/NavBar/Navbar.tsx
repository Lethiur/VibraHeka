import { Link, NavLink } from "react-router-dom";
import './Navbar.scss'
import { Navbar, Container, Image, Nav } from "react-bootstrap";

import logo from "../../../../../Assets/Images/logo-web.png";
interface NavbarProps {
    isAuthenticated: boolean;
    onLogout: () => void;
    role: number
}

export default function VHNavbar({ isAuthenticated, onLogout, role }: NavbarProps) {
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary" collapseOnSelect>
            <Container>
                {/* Marca y Logo */}
                <Navbar.Brand as={Link} to="/">
                    <Image
                        src={logo}
                        alt="VibraHeka"
                        className="navbar-brand__logo"
                    />
                    <span>VibraHeka</span>
                </Navbar.Brand>

                {/* BOTÓN HAMBURGUESA: React Bootstrap lo gestiona internamente */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {/* CONTENIDO COLAPSABLE: Debe ser Navbar.Collapse */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/terapeutas">Terapeutas</Nav.Link>

                        {!isAuthenticated && (
                            <>
                                <Nav.Link as={NavLink} to="/registro">Registrarse</Nav.Link>
                                <Nav.Link as={NavLink} to="/login">Identificarse</Nav.Link>
                            </>
                        )}

                        {(role === 1 && isAuthenticated) && (
                            <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
                        )}

                        { isAuthenticated && (
                            <>
                                <Nav.Link as={NavLink} to="/profile/me">Mi Perfil</Nav.Link>
                                <Nav.Link as={NavLink} to="/talleres">Talleres</Nav.Link>
                                <button onClick={onLogout} className="nav-link">
                                    Cerrar sesión
                                </button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
