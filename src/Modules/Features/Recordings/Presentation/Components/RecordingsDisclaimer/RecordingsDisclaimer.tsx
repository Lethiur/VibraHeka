import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import {Lock} from "lucide-react";
import "./RecordingsDisclaimer.scss";

interface RecordingsDisclaimerProps {
    className?: string;
}

const RecordingsDisclaimer: React.FC<RecordingsDisclaimerProps> = ({className = ""}) => {
    return (
        <div className={`recordings-disclaimer ${className}`}>
            <Container fluid className="p-0">
                <Row className="justify-content-center g-0">
                    <Col xs={12} className="p-0">
                        <div className="recordings-disclaimer__content">
                            <div className="recordings-disclaimer__icon">
                                <Lock size={48}/>
                            </div>
                            <h2 className="recordings-disclaimer__title">📍 Acceso Exclusivo para Miembros</h2>
                            <p className="recordings-disclaimer__text">
                                Las grabaciones estan disponibles unicamente para miembros registrados. Unete a nuestra
                                comunidad para acceder a todo el contenido.
                            </p>
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
                            <div className="recordings-disclaimer__cta">

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RecordingsDisclaimer;
