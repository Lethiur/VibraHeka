import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "@core/Presentation/Components/atoms/Logo/Logo";
import "./Footer.scss";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="vh-footer">
            <Container className="px-3 px-sm-4">
                <Row className="vh-footer__body g-5">

                    {/* Brand */}
                    <Col lg={5} md={12} className="vh-footer__brand">
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <Logo alt="VibraHeka Logo" width={52} height={52} />
                            <span className="vh-footer__brand-name">VibraHeka</span>
                        </div>
                        <p className="vh-footer__tagline">
                            Tu refugio online para volver a sentir paz, enfoque y energía en tu vida diaria.
                        </p>
                    </Col>

                    {/* Nav */}
                    <Col lg={3} md={6} sm={6} xs={6}>
                        <h6 className="vh-footer__heading">Plataforma</h6>
                        <ul className="vh-footer__links">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/terapeutas">Terapeutas</Link></li>
                            <li><Link to="/clases-gratuitas">Clases Gratuitas</Link></li>
                        </ul>
                    </Col>

                    {/* Legal */}
                    <Col lg={4} md={6} sm={6} xs={6}>
                        <h6 className="vh-footer__heading">Legal</h6>
                        <ul className="vh-footer__links">
                            <li><Link to="/politica-de-privacidad">Política de privacidad</Link></li>
                            <li><Link to="/aviso-legal">Aviso legal</Link></li>
                            <li><Link to="/terminos-y-condiciones">Términos y condiciones</Link></li>
                        </ul>
                    </Col>
                </Row>

                <div className="vh-footer__bottom">
                    <p className="vh-footer__copy">
                        © {year} VibraHeka · Todos los derechos reservados
                    </p>
                    <div className="vh-footer__legal-links">
                        <Link to="/politica-de-privacidad">Privacidad</Link>
                        <span aria-hidden="true">·</span>
                        <Link to="/aviso-legal">Aviso legal</Link>
                        <span aria-hidden="true">·</span>
                        <Link to="/terminos-y-condiciones">Términos</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
