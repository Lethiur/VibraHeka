import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import {Info, Lock} from "lucide-react";
import {Col, Row} from "react-bootstrap";

import "./AccessDisclaimer.scss";

export default function AccessDisclaimer() {

    return (
        <div className="access-disclaimer">
            <div className="access-disclaimer__content">
                <div className="access-disclaimer__icon">
                    <Lock size={48}/>
                </div>
                <h2 className="access-disclaimer__title">
                    📍 Acceso Exclusivo para Miembros
                </h2>
                <p className="access-disclaimer__text">
                    Las actividades en vivo están reservadas para nuestra comunidad. Los enlaces de acceso a las
                    actividades se pondrán en nuestro <strong>Grupo de WhatsApp de Miembros</strong>.
                </p>

                <div className="access-disclaimer__cta">
                    <Row className="justify-content-center g-2 mt-3">
                        <Col xs={12} md={6}>
                            <PrimaryButton
                                label="Registrarse"
                                variant="primary"
                                to="/registro"
                                fullWidth
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <PrimaryButton
                                label="Identificarse"
                                variant="secondary"
                                to="/login"
                                fullWidth
                            />
                        </Col>
                    </Row>
                </div>

                <div className="access-disclaimer__recordings">
                    <Info size={18}/>
                    <span>Todas las grabaciones de las sesiones estarán disponibles para los suscriptores en su área personal.</span>
                </div>
            </div>
        </div>
    );
};