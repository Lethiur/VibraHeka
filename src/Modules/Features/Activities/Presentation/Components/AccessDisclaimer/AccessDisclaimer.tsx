import React from "react";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import { Info, Lock } from "lucide-react";
import "./AccessDisclaimer.scss";

interface AccessDisclaimerProps {
    type: "unauthenticated" | "no-subscription";
}

const AccessDisclaimer: React.FC<AccessDisclaimerProps> = ({ type }) => {
    const isUnauthenticated = type === "unauthenticated";

    return (
        <div className="access-disclaimer">
            <div className="access-disclaimer__content">
                <div className="access-disclaimer__icon">
                    <Lock size={48} />
                </div>
                <h2 className="access-disclaimer__title">
                    📍 Acceso Exclusivo para Miembros
                </h2>
                <p className="access-disclaimer__text">
                    Las actividades en vivo están reservadas para nuestra comunidad. Los enlaces de acceso a las actividades se pondrán en nuestro <strong>Grupo de WhatsApp de Miembros</strong>.
                </p>

                <div className="access-disclaimer__cta">
                    {isUnauthenticated ? (
                        <PrimaryButton
                            label="Crear una cuenta"
                            to="/registro"
                            variant="primary"
                            fullWidth
                        />
                    ) : (
                        <PrimaryButton
                            label="Suscribirse ahora"
                            to="/profile/me"
                            variant="primary"
                            fullWidth
                        />
                    )}
                </div>

                <div className="access-disclaimer__recordings">
                    <Info size={18} />
                    <span>Todas las grabaciones de las sesiones estarán disponibles para los suscriptores en su área personal.</span>
                </div>
            </div>
        </div>
    );
};

export default AccessDisclaimer;
