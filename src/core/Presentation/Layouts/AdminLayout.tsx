import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function AdminLayout() {
    const { t } = useTranslation();
    return (
        <div className="admin-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
            {/* Navbar Superior */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/admin">{t('pages.admin.title')}</Navbar.Brand>
                </Container>
            </Navbar>

            <Container fluid className="flex-grow-1">
                <Row style={{ minHeight: 'calc(100vh - 56px)' }}>
                    {/* Sidebar Lateral */}
                    <Col md={2} className="bg-light d-none d-md-block sidebar py-4 border-end">
                        <Nav className="flex-column px-2">
                            <Nav.Link as={Link} to="/admin" className="text-dark">📊 Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/admin/therapists" className="text-dark">👥 Terapeutas</Nav.Link>
                            <Nav.Link as={Link} to="/admin/products" className="text-dark">📦 Productos</Nav.Link>
                            <Nav.Link as={Link} to="/admin/settings" className="text-dark">⚙️ Configuración</Nav.Link>
                            <Nav.Link as={Link} to="/admin/emails" className="text-dark">⚙️ Correos electornicos</Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={10} className="py-4 px-4 bg-white">
                        <main>
                            <Outlet />
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}