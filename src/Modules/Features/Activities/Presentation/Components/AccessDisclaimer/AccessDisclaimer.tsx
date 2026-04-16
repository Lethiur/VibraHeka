import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import UseSubscribe from "@users/Presentation/Hooks/UseSubscribe";
import UseGetSubscription from "@users/Presentation/Hooks/UseGetSubscription";
import { SubscriptionStatus } from "@users/Domain/Enums/SubscriptionStatus";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import { Info, Lock } from "lucide-react";
import MemberWhatsAppNotice from "../MemberWhatsAppNotice/MemberWhatsAppNotice";
import "./AccessDisclaimer.scss";

interface AccessDisclaimerProps {
    type: "unauthenticated" | "no-subscription";
}

const AccessDisclaimer: React.FC<AccessDisclaimerProps> = ({ type, subscription, subscriptionLoading }) => {
    const navigate = useNavigate();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const { checkoutURL, loading: subscribeLoading, subscribe } = UseSubscribe();

    const [isProcessing, setIsProcessing] = useState(false);

    // Redirección asíncrona a Stripe
    useEffect(() => {
        if (checkoutURL) {
            window.open(checkoutURL, "_self");
        }
    }, [checkoutURL]);

    const handleAction = () => {
        if (!isAuthenticated) {
            navigate("/registro?redirect=/actividades");
            return;
        }

        if (subscription?.SubscriptionStatus === SubscriptionStatus.ACTIVE) {
            navigate("/profile/me");
            return;
        }

        setIsProcessing(true);
        subscribe();
    };

    const isLoading = isProcessing || subscribeLoading || subscriptionLoading;

    // Verificar si el usuario ya tiene una suscripción activa
    const hasActiveSubscription = subscription &&
        (subscription.SubscriptionStatus === SubscriptionStatus.ACTIVE ||
            subscription.SubscriptionStatus === SubscriptionStatus.TRIALING ||
            subscription.SubscriptionStatus === SubscriptionStatus.TO_BE_CANCELLED);

    // Verificar si el periodo de suscripción se ha cerrado (19 de abril)
    const isSubscriptionClosed = new Date().getTime() > new Date("2026-04-18T18:00:00Z").getTime();

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
                    {hasActiveSubscription ? (
                        <div className="w-100">
                             <MemberWhatsAppNotice />
                        </div>
                    ) : (
                        <>
                            {!isSubscriptionClosed ? (
                                <PrimaryButton
                                    label={isLoading ? "Iniciando proceso seguro..." : (type === "unauthenticated" ? "Crear una cuenta" : "Suscribirme ahora")}
                                    variant="primary"
                                    fullWidth
                                    onClick={handleAction}
                                    disabled={isLoading}
                                />
                            ) : (
                                <div className="access-disclaimer__closed-notice mb-3">
                                    <Lock size={16} className="text-muted" />
                                    <small className="text-muted">Las inscripciones están cerradas por el momento.</small>
                                </div>
                            )}

                            <PrimaryButton
                                label="¿Qué incluye la suscripción?"
                                variant="secondary"
                                fullWidth
                                onClick={() => navigate("/subscripcion")}
                            />
                        </>
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

interface AccessDisclaimerProps {
    type: "unauthenticated" | "no-subscription";
    subscription?: any;
    subscriptionLoading?: boolean;
}

export default AccessDisclaimer;
