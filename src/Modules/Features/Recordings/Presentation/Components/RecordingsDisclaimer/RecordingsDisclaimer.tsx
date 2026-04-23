import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import { Lock } from "lucide-react";
import "./RecordingsDisclaimer.scss";

interface RecordingsDisclaimerProps {
    className?: string;
}

const RecordingsDisclaimer: React.FC<RecordingsDisclaimerProps> = ({ className = "" }) => {
    const navigate = useNavigate();

    const handleAction = () => {
        navigate("/registro?redirect=/grabaciones");
    };

    return (
        <div className={`recordings-disclaimer ${className}`}>
            <div className="recordings-disclaimer__content">
                <div className="recordings-disclaimer__icon">
                    <Lock size={48} />
                </div>
                <h2 className="recordings-disclaimer__title">
                    Suscripción Requerida
                </h2>
                <p className="recordings-disclaimer__text">
                    Las grabaciones están disponibles únicamente para miembros registrados. Únete a nuestra comunidad para acceder a todo el contenido.
                </p>

                <div className="recordings-disclaimer__cta">
                    <PrimaryButton
                        label="Registrarse para acceder"
                        variant="primary"
                        fullWidth
                        onClick={handleAction}
                    />
                </div>
            </div>
        </div>
    );
};

export default RecordingsDisclaimer;
