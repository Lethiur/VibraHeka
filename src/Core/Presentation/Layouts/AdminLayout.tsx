import { useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AdminLayout.scss";

interface AdminNavItem {
    labelKey: string;
    to: string;
    end?: boolean;
    emoji: string;
}

interface AdminNavGroup {
    labelKey: string;
    emoji: string;
    items: AdminNavItem[];
}

const adminNavGroups: AdminNavGroup[] = [
    {
        labelKey: "pages.admin.nav.groups.catalog",
        emoji: "📦",
        items: [
            { labelKey: "pages.admin.nav.recordings", to: "/admin/recordings", emoji: "🎬" },
            { labelKey: "pages.admin.nav.events", to: "/admin/events", emoji: "📅" },
        ],
    },
    {
        labelKey: "pages.admin.nav.groups.communications",
        emoji: "✉️",
        items: [
            { labelKey: "pages.admin.nav.emails", to: "/admin/emails", end: true, emoji: "📧" },
            { labelKey: "pages.admin.nav.email_templates", to: "/admin/emails/templates", emoji: "📝" },
        ],
    },
    {
        labelKey: "pages.admin.nav.groups.team",
        emoji: "👥",
        items: [
            { labelKey: "pages.admin.nav.therapists", to: "/admin/therapists", end: true, emoji: "🧘" },
        ],
    },
];

export default function AdminLayout() {
    const { t } = useTranslation();
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
        Object.fromEntries(adminNavGroups.map((g) => [g.labelKey, true]))
    );

    const toggleGroup = (key: string) =>
        setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

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
                            <Nav.Link
                                as={NavLink}
                                to="/admin/dashboard"
                                end
                                className="admin-layout__nav-link"
                            >
                                <span className="admin-layout__nav-emoji">🏠</span>
                                {t("pages.admin.nav.dashboard")}
                            </Nav.Link>

                            {adminNavGroups.map((group) => (
                                <div key={group.labelKey} className="admin-layout__nav-group">
                                    <button
                                        className="admin-layout__nav-group-header"
                                        onClick={() => toggleGroup(group.labelKey)}
                                        aria-expanded={openGroups[group.labelKey]}
                                    >
                                        <span className="admin-layout__nav-emoji">{group.emoji}</span>
                                        <span className="admin-layout__nav-group-label">{t(group.labelKey)}</span>
                                        <span className={`admin-layout__nav-group-chevron${openGroups[group.labelKey] ? " admin-layout__nav-group-chevron--open" : ""}`}>
                                            ›
                                        </span>
                                    </button>
                                    {openGroups[group.labelKey] && (
                                        <div className="admin-layout__nav-group-items">
                                            {group.items.map((item) => (
                                                <Nav.Link
                                                    key={item.to}
                                                    as={NavLink}
                                                    to={item.to}
                                                    end={item.end}
                                                    className="admin-layout__nav-link admin-layout__nav-link--child"
                                                >
                                                    <span className="admin-layout__nav-emoji">{item.emoji}</span>
                                                    {t(item.labelKey)}
                                                </Nav.Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
