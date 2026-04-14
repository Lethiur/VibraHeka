import { Link, NavLink } from "react-router-dom";
import './Navbar.scss'
import { Navbar, Container, Image, Nav } from "react-bootstrap";
import { useState } from "react";

import logo from "../../../../../Assets/Images/logo-web.png";
interface NavbarProps {
    isAuthenticated: boolean;
    onLogout: () => void;
    role: number
}

export default function VHNavbar({ isAuthenticated, onLogout, role }: NavbarProps) {
    const [expanded, setExpanded] = useState(false);
    
    return (
        <Navbar
            expand="lg"
            className="bg-body-tertiary"
            collapseOnSelect
            expanded={expanded}
            onToggle={(nextExpanded) => setExpanded(!!nextExpanded)}
            onSelect={() => setExpanded(false)}
        >
            <Container>
                {/* Marca y Logo */}
                <Navbar.Brand
                    as={Link}
                    to="/"
                    onClick={() => setExpanded(false)}
                >
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
                        <Nav.Link as={NavLink} to="/" onClick={() => setExpanded(false)}>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/terapeutas" onClick={() => setExpanded(false)}>Terapeutas</Nav.Link>

                        {!isAuthenticated && (
                            <>
                                <Nav.Link as={NavLink} to="/registro" onClick={() => setExpanded(false)}>Registrarse</Nav.Link>
                                <Nav.Link as={NavLink} to="/login" onClick={() => setExpanded(false)}>Identificarse</Nav.Link>
                            </>
                        )}

                        {(role === 1 && isAuthenticated) && (
                            <Nav.Link as={NavLink} to="/admin" onClick={() => setExpanded(false)}>Admin</Nav.Link>
                        )}

                        { isAuthenticated && (
                            <>
                                <Nav.Link as={NavLink} to="/profile/me" onClick={() => setExpanded(false)}>Mi Perfil</Nav.Link>
                                <Nav.Link as={NavLink} to="/talleres" onClick={() => setExpanded(false)}>Talleres</Nav.Link>
                                <button
                                    onClick={() => {
                                        setExpanded(false);
                                        onLogout();
                                    }}
                                    className="nav-link"
                                >
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
