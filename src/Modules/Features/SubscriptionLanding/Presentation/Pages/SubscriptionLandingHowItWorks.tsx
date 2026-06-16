import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { BadgePercent, BrainCircuit, CalendarCheck, CheckCircle2, Clock, MessageCircleQuestion, RefreshCcw, ShieldCheck, Sparkles, Users, Video } from "lucide-react";
import "./SubscriptionLanding.scss";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton.tsx";
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom.ts";
import { SubscriptionStatus } from "@users/Domain/Enums/SubscriptionStatus";
import UseSubscribe from "@users/Presentation/Hooks/UseSubscribe";
import UseGetSubscription from "@users/Presentation/Hooks/UseGetSubscription";

export default function SubscriptionLandingHowItWorks() {
    const navigate = useNavigate();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const { checkoutURL, loading: subscribeLoading, subscribe } = UseSubscribe();
    const { subscription, loading: subscriptionLoading, getSubscription } = UseGetSubscription();
    const [isProcessing, setIsProcessing] = useState(false);
    const [timeLeft, setTimeLeft] = useState<{ h: number, m: number, s: number }>({ h: 0, m: 0, s: 0 });
    const [isOfferExpired, setIsOfferExpired] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const target = new Date("2026-05-31T21:00:00Z");
            const difference = target.getTime() - now.getTime();

            if (difference <= 0) {
                setIsOfferExpired(true);
                setTimeLeft({ h: 0, m: 0, s: 0 });
                return;
            }

            setTimeLeft({
                h: Math.floor(difference / (1000 * 60 * 60)),
                m: Math.floor((difference / (1000 * 60)) % 60),
                s: Math.floor((difference / 1000) % 60),
            });
            setIsOfferExpired(false);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (isAuthenticated && !subscription) {
            getSubscription();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (checkoutURL) {
            window.open(checkoutURL, "_self");
        }
    }, [checkoutURL]);

    const handleSubscribeAction = () => {
        if (!isAuthenticated) {
            navigate("/registro?redirect=/subscripcion/como-funciona");
            return;
        }

        if (subscription?.SubscriptionStatus === SubscriptionStatus.ACTIVE) {
            navigate("/profile/me");
            return;
        }

        setIsProcessing(true);
        subscribe();
    };

    const isLoading = isProcessing || subscribeLoading || (isAuthenticated && subscriptionLoading);

    const features = [
        {
            icon: <Sparkles size={24} />,
            title: "VibraHeka no es para consumir contenido, es para aplicarlo en tu vida diaria.",
            description: "Cada semana nos enfocamos en un tema concreto: abrimos con una clase para plantear en qué vamos a trabajar, te proponemos las prácticas para que las vayas asimilando en tu rutina y, a la semana, nos volvemos a reunir en un espacio de acompañamiento para compartir cómo te has sentido, qué has aprendido y de qué te has dado cuenta."
        },
        {
            icon: <BrainCircuit size={24} />,
            title: "Un lugar donde, si algo te ha incomodado, te explicamos el porqué y te damos pautas para saber manejarlo.",
            description: ""
        },
    ];

    const includes = [
        {
            icon: <Video size={20} />,
            title: "Encuentros online en directo",
            description: "Acceso en vivo a las clases de propuestas de los miércoles y a las revisiones de los martes."
        },
        {
            icon: <RefreshCcw size={20} />,
            title: "Biblioteca de grabaciones",
            description: "Grabaciones de los directos semanales por si te los pierdes."
        },
        {
            icon: <Users size={20} />,
            title: "Grupo privado de WhatsApp",
            description: "Para compartir con personas en tu mismo camino."
        },
        {
            icon: <BadgePercent size={20} />,
            title: "Ventajas exclusivas",
            description: "Acceso preferente y descuentos en terapias o actividades del equipo."
        },
        {
            icon: <CalendarCheck size={20} />,
            title: "Actividades gratuitas",
            description: "Acceso inmediato y sin coste a la mayoría de actividades programadas y con descuento en la programación con coste."
        },
        {
            icon: <CheckCircle2 size={20} />,
            title: "Cero riesgo",
            description: "14 días de prueba gratuitos y sin permanencia. Cancela en un clic cuando lo desees."
        }
    ];

    return (
        <div className="subscription-landing vh-page-section">
            <Container>
                <section className="subscription-landing__eyebrow type-caption">
                    <h1>C&Oacute;MO FUNCIONA</h1>
                </section>

                <section className="subscription-landing__copy-block subscription-landing__copy-block--naked subscription-landing__copy-block--intro">
                    {features.map((feature) => (
                        <div className="subscription-landing__feature" key={feature.title}>
                            <div className="subscription-landing__feature-icon">{feature.icon}</div>
                            <div>
                                <p className="subscription-landing__feature-title">{feature.title}</p>
                                {feature.description && <p>{feature.description}</p>}
                            </div>
                        </div>
                    ))}
                </section>

                <section className="subscription-landing__copy-block subscription-landing__copy-block--naked">
                    <h2>QUÉ ENCONTRARÁS DENTRO</h2>
                    <Row className="g-4">
                        {includes.map((item) => (
                            <Col md={6} lg={4} key={item.title}>
                                <article className="subscription-landing__feature-card">
                                    <div className="subscription-landing__feature-card-icon">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </article>
                            </Col>
                        ))}
                    </Row>
                </section>

                <section className="subscription-landing__pricing-section">
                    <Col className="d-flex flex-column align-items-center">
                        <h2>DA EL PASO</h2>
                        <div className={`subscription-landing__pricing-card subscription-landing__pricing-card--modern ${isOfferExpired ? 'is-expired' : ''}`}>
                            <div className="subscription-landing__pricing-card-topline">
                                <span>Empieza hoy</span>
                                <span>Plan Mensual</span>
                            </div>
                            <div className="subscription-landing__pricing-card-price">
                                {!isOfferExpired && <span className="subscription-landing__pricing-card-price-old">22€</span>}
                                <span className="subscription-landing__pricing-card-price-new">{isOfferExpired ? '22€' : '17€'}<small>/mes</small></span>
                            </div>
                            {!isOfferExpired && <div className="subscription-landing__pricing-card-countdown">
                                <p className="subscription-landing__pricing-card-countdown-label">
                                    <Clock size={16} /> {isOfferExpired ? 'Oferta finalizada' : 'La oferta finaliza en:'}
                                </p>
                                <div className="subscription-landing__pricing-card-countdown-timer">
                                    <div className="unit"><span>{String(timeLeft.h).padStart(2, '0')}</span><small>h</small></div>
                                    <span className="sep">:</span>
                                    <div className="unit"><span>{String(timeLeft.m).padStart(2, '0')}</span><small>m</small></div>
                                    <span className="sep">:</span>
                                    <div className="unit"><span>{String(timeLeft.s).padStart(2, '0')}</span><small>s</small></div>
                                </div>
                            </div> }

                            <div className="subscription-landing__pricing-card-footnote">
                                <div>
                                    <h3>14 DÍAS DE PRUEBA GRATUITA</h3>
                                    <p>Prueba la plataforma, explora los contenidos y participa en las actividades. Después decide si quieres continuar. Sin permanencia. Puedes cancelar cuando quieras.</p>
                                </div>
                            </div>

                            <div className="subscription-landing__pricing-card-cta">
                                <PrimaryButton
                                    label={isLoading ? "Iniciando proceso seguro..." : "EMPEZAR PRUEBA GRATUITA"}
                                    variant="primary"
                                    fullWidth
                                    onClick={handleSubscribeAction}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="subscription-landing__pricing-card-guarantee">
                                <ShieldCheck size={16} /> Pago seguro gestionado por Stripe
                            </div>

                           

                        </div>
                    </Col>
                </section>
            </Container>
        </div>
    );
}