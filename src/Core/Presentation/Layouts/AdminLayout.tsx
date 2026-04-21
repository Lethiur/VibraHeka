import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AdminLayout.scss";

interface AdminNavItem {
    labelKey: string;
    to: string;
    end?: boolean;
}

const adminNavItems: AdminNavItem[] = [
    { labelKey: "pages.admin.nav.dashboard", to: "/admin/dashboard", end: true },
    { labelKey: "pages.admin.nav.therapists", to: "/admin/therapists", end: true },
    { labelKey: "pages.admin.nav.emails", to: "/admin/emails", end: true },
    { labelKey: "pages.admin.nav.email_templates", to: "/admin/emails/templates" },
    { labelKey: "pages.admin.nav.recordings", to: "/admin/recordings" },
];

export default function AdminLayout() {
    const { t } = useTranslation();

    return (
        <div className="admin-layout">
            <Navbar expand="lg" className="admin-layout__topbar">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/admin/dashboard" className="admin-layout__brand">
                        {t("pages.admin.title")}
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Container fluid className="admin-layout__content">
                <Row className="g-0 h-100">
                    <Col md={3} lg={2} className="d-none d-md-block admin-layout__sidebar">
                        <Nav className="flex-column admin-layout__nav">
                            {adminNavItems.map((item: AdminNavItem) => (
                                <Nav.Link
                                    key={item.to}
                                    as={NavLink}
                                    to={item.to}
                                    end={item.end}
                                    className="admin-layout__nav-link"
                                >
                                    {t(item.labelKey)}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Col>

                    <Col md={9} lg={10} className="admin-layout__main-col">
                        <main className="admin-layout__main">
                            <Outlet />
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
