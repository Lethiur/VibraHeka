// import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
// import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import { RefreshCcw, BrainCircuit, MessageCircleQuestion, Video, Users, BadgePercent, CalendarCheck, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import "./SubscriptionLanding.scss";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton.tsx";
import {isAuthenticatedAtom} from "@core/Presentation/Storage/AuthAtom.ts";
import { SubscriptionStatus } from "@users/Domain/Enums/SubscriptionStatus";
import UseSubscribe from "@users/Presentation/Hooks/UseSubscribe";
import UseGetSubscription from "@users/Presentation/Hooks/UseGetSubscription";
import { useEffect, useState } from "react";

export default function SubscriptionLanding() {
    const navigate = useNavigate();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    // Hooks para gestión de la suscripción y pagos de Stripe
    const { checkoutURL, loading: subscribeLoading, subscribe } = UseSubscribe();
    const { subscription, loading: subscriptionLoading, getSubscription } = UseGetSubscription();
    
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Fecha límite absoluta para suscripciones: Domingo 19 de Abril de 2026 a las 18:00 UTC
    const [isSubscriptionClosed, setIsSubscriptionClosed] = useState(false);
    
    // Lógica del contador regresivo hasta el Viernes 17 de Abril a las 18:00 UTC
    const [timeLeft, setTimeLeft] = useState<{ h: number, m: number, s: number }>({ h: 0, m: 0, s: 0 });
    const [isOfferExpired, setIsOfferExpired] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
    
            // Verificar si el periodo de suscripción general se ha cerrado (19 de abril)
            const globalDeadline = new Date("2026-05-04T18:00:00Z");
            if (now.getTime() > globalDeadline.getTime()) {
                setIsSubscriptionClosed(true);
            }
    
            // Fecha objetivo fija para el contador (Oferta): Viernes 17 de Abril de 2026 a las 18:00 UTC
            // Esto evita que el contador se reinicie la semana siguiente.
            const target = new Date("2026-05-01T18:00:00Z");
    
            const difference = target.getTime() - now.getTime();
    
            if (difference <= 0) {
                setIsOfferExpired(true);
                setTimeLeft({ h: 0, m: 0, s: 0 });
                return;
            }
    
            const h = Math.floor(difference / (1000 * 60 * 60));
            const m = Math.floor((difference / (1000 * 60)) % 60);
            const s = Math.floor((difference / 1000) % 60);
    
            setTimeLeft({ h, m, s });
            setIsOfferExpired(false);
        };
    
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);
    
    // Cargar suscripción al entrar si estamos identificados
    useEffect(() => {
        if (isAuthenticated && !subscription) {
            getSubscription();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);
    
    // Redirección asíncrona a Stripe cuando el hook genera el URL
    useEffect(() => {
        if (checkoutURL) {
            window.open(checkoutURL, "_self");
        }
    }, [checkoutURL]);

    // Lógica del botón principal
    const handleSubscribeAction = () => {
        // 1. Si no hay sesión, mandarlo a registro
        if (!isAuthenticated) {
            navigate("/registro?redirect=/subscripcion");
            return;
        }
        
        // 2. Si hay sesión y la suscripción está activa, no hace falta que pague de nuevo
        if (subscription?.SubscriptionStatus === SubscriptionStatus.ACTIVE) {
            navigate("/profile/me");
            return;
        }
        
        // 3. Usuario listo y sin suscripción activa -> Generar checkout URL
        setIsProcessing(true);
        subscribe();
    }

    const isLoading = isProcessing || subscribeLoading || (isAuthenticated && subscriptionLoading);

    const benefits = [
        {
            icon: <BrainCircuit size={24} />,
            title: "Meditaciones Guiadas",
            description: "Prácticas centradas en calmar profundamente el sistema nervioso."
        },
        {
            icon: <RefreshCcw size={24} />,
            title: "Liberación Consciente",
            description: "Prácticas para liberar el estrés, soltar emociones reprimidas y aliviar tensiones físicas."
        },
        {
            icon: <MessageCircleQuestion size={24} />,
            title: "Espacio de Q&A",
            description: "Sesiones de preguntas y respuestas para sentirte acompañado y ganar herramientas útiles."
        },
        {
            icon: <BadgePercent size={24} />,
            title: "Descuento en Terapias",
            description: "Accede a sesiones, talleres y constelaciones por un valor inferior al precio de mercado."
        },
        {
            icon: <Video size={24} />,
            title: "Grabaciones Disponibles",
            description: "Todas las grabaciones de las actividades, disponibles en tu panel para ver a tu ritmo."
        },
        {
            icon: <Users size={24} />,
            title: "Grupo Exclusivo",
            description: "Acceso a nuestro grupo de WhatsApp diseñado exclusivamente para miembros."
        },
        {
            icon: <CalendarCheck size={24} />,
            title: "Actividades Gratuitas",
            description: "Acceso inmediato y sin coste a la mayoría de actividades programadas y con descuento en la programación con coste."
        },
        {
            icon: <CheckCircle2 size={24} />,
            title: "Cero Riesgo",
            description: "14 días de prueba gratuitos y sin permanencia. Cancela en un clic cuando lo desees."
        }
    ];

    return (
        <div className="subscription-landing vh-page-section">
            <Container>
                {/* Hero Superior */}
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <div className="subscription-landing__hero">
                            <h1 className="subscription-landing__hero-title">
                                Da el paso hacia un <strong>bienestar real</strong> y sostenible
                            </h1>
                            <p className="subscription-landing__hero-subtitle">
                                Tu mente no descansa. Tu cuerpo tampoco Entra en VibraHeka: el espacio de acompañamiento donde sueltas  el  estrés y empiezas a recuperar tu calma
                            </p>
                        </div>
                    </Col>
                </Row>
                {/* { !isAuthenticated && (<Row className="justify-content-center">
                    <Col md={12}>
                        <PrimaryButton
                            label={'Quiero unirme a VibraHeka'}
                            variant="primary"
                            fullWidth
                            trackId="subscription_landing_subscribe_button"
                            onClick={handleSubscribeAction}
                        />
                    </Col>
                </Row>)} */}

                 {/* Tarjeta de Pricing Central */}
                <Row className="justify-content-center">
                    <Col md={10} lg={8} xl={6}>
                        <div className={`subscription-landing__pricing-card ${isOfferExpired ? 'is-expired' : ''}`}>
                            <span className="subscription-landing__pricing-card-period">Plan Mensual</span>
                            <div className="subscription-landing__pricing-card-price">
                                {!isOfferExpired && <span className="subscription-landing__pricing-card-price-old">22€</span>}
                                <span className="subscription-landing__pricing-card-price-new">
                                    {isOfferExpired ? '22€' : '17€'}<small>/mes</small>
                                </span>
                            </div>

                            {/* Contador de Oferta */}
                            <div className="subscription-landing__pricing-card-countdown">
                                <p className="subscription-landing__pricing-card-countdown-label">
                                    <Clock size={16} /> {isOfferExpired ? 'Oferta finalizada' : 'La oferta finaliza en:'}
                                </p>
                                <div className="subscription-landing__pricing-card-countdown-timer">
                                    <div className="unit">
                                        <span>{String(timeLeft.h).padStart(2, '0')}</span>
                                        <small>h</small>
                                    </div>
                                    <span className="sep">:</span>
                                    <div className="unit">
                                        <span>{String(timeLeft.m).padStart(2, '0')}</span>
                                        <small>m</small>
                                    </div>
                                    <span className="sep">:</span>
                                    <div className="unit">
                                        <span>{String(timeLeft.s).padStart(2, '0')}</span>
                                        <small>s</small>
                                    </div>
                                </div>
                            </div>

                            {(!isSubscriptionClosed) ? (
                                <div className="subscription-landing__pricing-card-cta">
                                    <PrimaryButton
                                        label={isLoading ? "Iniciando proceso seguro..." : (isAuthenticated && subscription?.SubscriptionStatus === SubscriptionStatus.ACTIVE ? "Ya estás suscrito - Ir a mi panel" : "Suscribirme Ahora")}
                                        variant="primary"
                                        fullWidth
                                        onClick={handleSubscribeAction}
                                        disabled={isLoading}
                                    />
                                </div>
                            ) : (
                                <div className="subscription-landing__pricing-card-closed mt-4">
                                    <p className="text-muted small">El periodo de suscripción ha finalizado por ahora.</p>
                                </div>
                            )}

                            <div className="subscription-landing__pricing-card-guarantee">
                                <ShieldCheck size={16} /> Pago seguro gestionado por Stripe
                            </div>
                        </div>
                    </Col>
                </Row>
                
                
                {/* Desglose de Beneficios */}
                <div className="subscription-landing__benefits">
                    <h2 className="subscription-landing__benefits-title">¿Qué incluye tu cuenta?</h2>

                    <Row className="g-4">
                        {benefits.map((benefit, index) => (
                            <Col md={6} lg={4} key={index}>
                                <div className="subscription-landing__benefit-card h-100">
                                    <div className="subscription-landing__benefit-card-icon">
                                        {benefit.icon}
                                    </div>
                                    <div className="subscription-landing__benefit-card-content">
                                        <h3>{benefit.title}</h3>
                                        <p>{benefit.description}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>

            </Container>
        </div>
    );
}
