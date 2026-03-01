import { ReactNode } from "react";
import "./AuthLayout.scss";
import { Card, Col, Container, Row } from "react-bootstrap";

interface AuthLayoutProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
    return (
        <Container>
            <Row className="justify-content-center align-items-center auth-layout__row">
                <Col xs={12} sm={11} md={9} lg={7} xl={6} xxl={5}>
                    <Card className="auth-layout__card border-0">
                        <Card.Body className="auth-layout__card-body p-0">
                            <header className="auth-layout__head text-center">
                                <h1 className="type-title">{title}</h1>
                                {subtitle && <p className="type-subtitle auth-layout__subtitle">{subtitle}</p>}
                            </header>
                            {children}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
