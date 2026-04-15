import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import "./LegalPage.scss";

interface LegalPageProps {
    title: string;
    lastUpdated: string;
    children: ReactNode;
}

export default function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
    return (
        <div className="legal-page vh-page-section">
            <Container className="px-3 px-sm-4">
                <header className="legal-page__header">
                    <p className="legal-page__updated">Última actualización: {lastUpdated}</p>
                    <h1 className="legal-page__title">{title}</h1>
                </header>
                <div className="legal-page__content">
                    {children}
                </div>
            </Container>
        </div>
    );
}
