import { Container, Row, Col } from "react-bootstrap";
import { BrainCircuit, Sparkles, Wind } from "lucide-react";
import "./SubscriptionLanding.scss";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton.tsx";
import { useNavigate } from "react-router-dom";

export default function SubscriptionLanding() {
    const navigate = useNavigate();

    const recognitions = [
        {
            icon: <BrainCircuit size={24} />,
            title: "LA MIRADA CANSADA",
            description: "Sientes que has perdido la perspectiva."
        },
        {
            icon: <Sparkles size={24} />,
            title: "EL RUIDO INTERNO",
            description: "No encuentras el interruptor mental."
        },
        {
            icon: <Wind size={24} />,
            title: "EL CUERPO RÍGIDO",
            description: "Tu musculatura retiene la carga."
        }
    ];

    const statements = [
        "Que es normal apretar la mandíbula.",
        "Que es normal no poder dejar de pensar.",
        "Que es normal llegar al final del día agotados y seguir sin desconectar.",
        "Como si no hubiera otra manera de vivir.",
        "Pero cuando algo se repite durante años, no siempre significa que sea normal.",
        "Puede que hayas aprendido a funcionar así.",
        "A seguir adelante aunque el cuerpo esté cansado.",
        "A ignorar ciertas molestias porque siempre están ahí.",
        "A convivir con el ruido mental porque ya forma parte de tu día a día.",
        "Pero acostumbrarse a algo no significa que tenga que seguir siendo así."
    ]

    return (
        <div className="subscription-landing vh-page-section">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10} className="subscription-landing__intro">
                        <div className="subscription-landing__hero">
                            <h1 className="subscription-landing__hero-title">
                                CUANDO VIVIR EN TENSIÓN SE VUELVE NORMAL
                            </h1>
                            <p className="subscription-landing__hero-subtitle">
                                Cuando vivir en tensión se vuelve normal, acabamos creyendo que siempre hemos sido así.
                            </p>
                        </div>
                    </Col>
                </Row>
                <section className="subscription-landing__copy-grid m-4">
                    <Row className="g-4">
                        {statements.map((statement, index) => (
                            <Col md={4} key={index}>
                                <article className="subscription-landing__recognition-card">
                                    <div className="subscription-landing__recognition-card-icon"><Sparkles size={24}></Sparkles></div>
                                    <p>{statement}</p>
                                </article>
                            </Col>
                        ))}
                    </Row>
                </section>
            </Container>
            <section className="landing-attention-band ">
                <Container className="px-3 px-sm-4">
                    <h1 className="subscription-landing__hero-title">¿TE RECONOCES EN ESTE MOMENTO?</h1>
                    <Row className="g-4 m-2">
                        {recognitions.map((item) => (
                            <Col md={4} key={item.title}>
                                <article className="subscription-landing__recognition-card">
                                    <div className="subscription-landing__recognition-card-icon">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </article>
                            </Col>
                        ))}
                    </Row>
                    <div className="subtitle subscription-landing__copy-block subscription-landing__copy-block--narrow subscription-landing__copy-block--naked">
                        <p>Si te identificas con alguna de estas situaciones, VibraHeka te da el respaldo de un grupo que camina a tu mismo ritmo.</p>
                        <p>Un espacio para recuperar el timón de tu día a día, despejar la mente y aflojar el cuerpo.</p>
                    </div>
                </Container>
            </section>
            <Container>

                <section className="subscription-landing__copy-block subscription-landing__copy-block--naked subscription-landing__copy-block--feature">
                    <h2>¿QUÉ ES VIBRAHEKA?</h2>
                    <p>VibraHeka es un espacio online para parar dos veces a la semana. Un lugar de práctica en vivo diseñado para darte un respiro, amortiguar el impacto de la rutina y recuperar el control cuando sientes que todo se desborda.</p>
                    <p>Aquí no venimos a acumular más información ni a darte tareas pendientes. Nos encontramos dos veces por semana —una para la clase con la propuesta práctica y otra para el espacio de revisión—, dándote el respaldo de un grupo que camina a tu mismo ritmo para:</p>
                    <ul className="subscription-landing__list">
                        <li>👁️ <strong>Ganar perspectiva:</strong> Ver con claridad en qué momentos te aceleras y aprender a despejar el panorama cuando el día se complica.</li>
                        <li>🗣️ <strong>Apagar el runrún:</strong> Bajar las revoluciones de tu cabeza, silenciar ese diálogo interno que te exige llegar a todo y aprender a responder con más lógica.</li>
                        <li>✋ <strong>Quitarle peso al cuerpo:</strong> Aflojar la musculatura de golpe, liberando la rigidez de la mandíbula y aprender a soltar la tensión que acumulas de lunes a viernes.</li>
                    </ul>
                    <p>No es un curso para rellenar tus horas libres.</p>
                    <p>No es teoría para que la archives en una carpeta.</p>
                    <p>Es un espacio semanal para aprender como actuar cuando estás bajo presión y dejar de normalizar ese desgaste constante de vivir siempre a la defensiva.</p>
                    <p>No necesitas dar un giro de 180 grados a tu vida. Solo necesitas dejar de ir a remolque y recuperar el control de tu día a día.</p>
                    <p>Si te has reconocido en alguna de estas situaciones, ahora puedes descubrir cómo trabajamos dentro de VibraHeka.</p>
                    <div className="subscription-landing__cta-row">
                        <PrimaryButton
                            label="QUIERO CONOCER VIBRAHEKA"
                            variant="primary"
                            fullWidth
                            onClick={() => navigate('/subscripcion/como-funciona')}
                        />
                    </div>
                </section>

            </Container>
        </div>
    );
}
