import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import Reveal from "@core/Presentation/Components/molecules/Reveal/Reveal";
import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import "./Landing.scss";
import Logo from "@core/Presentation/Components/atoms/Logo/Logo";
import {Col, Container, Row} from "react-bootstrap";

import fotoPag1 from "../../../../../Assets/Images/foto pag 1.jpg";
import fotoPag2 from "../../../../../Assets/Images/foto pag 2.jpg";
import fotoPag3 from "../../../../../Assets/Images/foto pag 3.jpg";
import fotoPag4 from "../../../../../Assets/Images/foto pag 4.jpg";
import fotoPag5 from "../../../../../Assets/Images/foto pag 5.jpg";
import fotoPag7 from "../../../../../Assets/Images/foto pag 7.jpg";

export default function LandingPage() {
    return (
        <div className="landing-page">
            <section
                className="landing position-relative d-flex align-items-center justify-content-center overflow-hidden text-center py-4 py-md-5">
                <Container className="landing-inner text-center p-3 p-sm-4 rounded-4">
                    <Logo alt="VibraHeka Logo" width={230} height={230}/>

                    <h1 className="main-headline my-4">
                        Tu <strong>refugio online</strong> para volver a sentir paz, enfoque y energía en tu vida diaria
                    </h1>

                    <p className="hero-subtitle mx-auto mb-0">
                        Baja el ruido mental, recupera tu centro y avanza con apoyo real desde el primer día.
                    </p>

                    <div className="cta-wrapper mt-4 mt-md-5">
                        <PrimaryButton label="Quiero unirme a VibraHeka" variant="primary"/>
                    </div>
                </Container>
            </section>

            <section className="landing-body py-5">
                <Container className="px-3 px-sm-4">
                    <section className="landing-intro">
                        <Reveal>
                            <Row className="landing-intro__pain justify-content-center text-center mb-5">
                                <Col lg={12}>
                                    <h2 className="section-title">
                                        Cuando sostienes demasiado por dentro, tu cuerpo termina gritandolo
                                    </h2>
                                </Col>
                                <Col lg={8}>
                                    <p className="section-subtitle">Lo que no expresas, se manifiesta.</p>
                                    <p>
                                        El cuerpo empieza a hablar cuando llevas demasiado tiempo acumulando tensión,
                                        preocupaciones o emociones que no han tenido espacio para salir.

                                        Y suele hacerlo de formas muy concretas:
                                    </p>
                                    <ul className="symptoms-list">
                                        <li>Tensión constante en cuello y pecho</li>
                                        <li>Pensamientos que no se detienen</li>
                                        <li>Sensación de alerta permanente</li>
                                        <li>Cansancio emocional que no se va</li>
                                    </ul>
                                </Col>
                                <Col lg={12}><p className="section-emphasis">
                                    No es <strong>debilidad</strong>. Es una señal clara de que necesitas reconectar
                                    contigo.
                                </p></Col>
                            </Row>
                        </Reveal>
                    </section>

                    <Reveal delay={60}>
                        <SideImageBlock image={fotoPag1} imageAlt="Comunidad VibraHeka" imageLeft={true}
                                        contentVerticalAlign="center">
                            <div className="landing-copy">
                                <h2>¿Qué encontrarás dentro de VibraHeka?</h2>
                                <p className="section-subtitle">Un ecosistema de crecimiento emocional y energético</p>
                                <p>
                                    Accedes a meditaciones guiadas, rituales de liberación, charlas conscientes,
                                    talleres prácticos
                                    y acompañamiento profesional en una misma ruta de crecimiento.
                                </p>
                                <p className="section-emphasis mb-0">
                                    Una misma intención: liberar tensión y realinear cuerpo, mente y emoción.
                                </p>
                            </div>
                        </SideImageBlock>
                    </Reveal>
                </Container>

                <section className="landing-attention-band">
                    <Container className="px-3 px-sm-4">
                        <Reveal>
                            <Row className="landing-intro__refuge align-items-center my-0">
                                <Col lg={12}>
                                    <h1 className="gy-2 my-5 text-center">
                                        VibraHeka es el <strong>refugio</strong> donde transformamos tu energía en
                                        bienestar
                                    </h1>
                                </Col>
                                <Col lg={6}>
                                    <p>
                                        Aquí entiendes lo que te pasa y aprendes a gestionarlo con una comunidad
                                        presente y cercana.
                                        No vienes a improvisar: sigues una ruta simple y sostenible para
                                        recuperar <strong>equilibrio</strong>.
                                        En pocas semanas empiezas a notar cambios en cómo piensas, sientes y respondes
                                        al día a día.
                                    </p>
                                </Col>

                                <Col lg={6}>
                                    <div className="subtitle">
                                        Aqu&iacute; encontrarás un espacio seguro y humano para soltar carga emocional y
                                        volver a sentir estabilidad.
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="my-5 text-center">
                                        <PrimaryButton label="Quiero empezar mi proceso" fullWidth={true}
                                                       variant="secondary"/>
                                    </div>
                                </Col>
                            </Row>
                        </Reveal>
                    </Container>
                </section>

                <Container className="px-3 px-sm-4">
                    <Reveal>
                        <SideImageBlock image={fotoPag2} imageAlt="Transformación personal" imageLeft={false}
                                        contentVerticalAlign="center">
                            <div className="landing-copy">
                                <h2>VibraHeka es para ti si estás listo para cambiar</h2>
                                <p className="section-subtitle">Si quieres dejar de sobrevivir en automático y volver a
                                    sentirte bien</p>
                                <p>
                                    Si sientes que el estrés te supera, que tus emociones impactan tu cuerpo y que
                                    necesitas
                                    recuperar calma con apoyo real, este espacio está pensado para ti.
                                </p>
                                <p className="section-emphasis mb-0">Empieza hoy, y nota la diferencia en ti.</p>
                            </div>
                        </SideImageBlock>
                    </Reveal>

                    <Reveal>
                        <SideImageBlock image={fotoPag4} imageAlt="Bienestar integral" imageLeft={true}
                                        contentVerticalAlign="center">
                            <div className="landing-copy">
                                <h2>El bienestar no ocurre por casualidad</h2>
                                <p className="section-subtitle">El cambio comienza cuando tienes el acompañamiento
                                    adecuado.</p>
                                <p>
                                    Con práctica guiada y seguimiento constante, empiezas a notar resultados concretos:
                                    menos estrés, mejor descanso, mayor claridad mental y una reconexión real con tu
                                    energía vital.
                                </p>
                                <p className="mb-0"><strong>Tu bienestar</strong> no es suerte: se construye cada día
                                    con intención y dirección.</p>
                                <p className="section-emphasis mb-0">Cuando te ordenas por dentro, todo empieza a
                                    fluir.</p>
                            </div>
                        </SideImageBlock>
                    </Reveal>

                    <Reveal>
                        <SideImageBlock image={fotoPag3} imageAlt="Camino VibraHeka" imageLeft={false}
                                        contentVerticalAlign="center">
                            <div className="landing-copy">
                                <h2>Tu camino empieza aqu&iacute;</h2>
                                <p className="section-subtitle">Con un proceso claro, humano y sostenible</p>
                                <p>En VibraHeka te ofrecemos una comunidad de apoyo donde podrás participar en multitud
                                    de actividades con el fin de hacerte más consciente de tus emociones y sensaciones.
                                    Además no estarás solo, recibirás acompañamiento cuando lo necesites. Todo esto para
                                    crear e integrar nuevos hábitos que se sostengan en el tiempo.</p>
                                <p className="section-emphasis">Inicia tu camino hacia la calma.</p>
                                <PrimaryButton label="Quiero empezar hoy" fullWidth={true} variant="secondary"/>
                            </div>
                        </SideImageBlock>
                    </Reveal>

                    <Reveal>
                        <SideImageBlock image={fotoPag5} imageAlt="Comunidad y calma" imageLeft={true}
                                        contentVerticalAlign="center">
                            <div className="landing-copy">
                                <h2>Transforma tus emociones</h2>
                                <p className="section-subtitle">Estrés en calma y ansiedad confianza y dirección</p>
                                <p>
                                    En <strong>VibraHeka</strong> no vas solo: compartes, practicas y avanzas junto a
                                    personas que están
                                    en un camino similar al tuyo.
                                </p>
                                <p className="section-emphasis">La tranquilidad que buscas puede empezar hoy.</p>
                                <PrimaryButton label="Quiero formar parte de VibraHeka" fullWidth={true}
                                               variant="secondary"/>
                            </div>
                        </SideImageBlock>
                    </Reveal>
                </Container>

                <section className="landing-difference-band">
                    <Container className="px-3 px-sm-4">
                        <Reveal>
                            <div className="landing-difference text-center py-4 py-md-5">
                                <h2>¿Qué hace diferente a VibraHeka?</h2>
                                <p className="section-subtitle">No son actividades sueltas: es un sistema integral de
                                    bienestar</p>
                                <p>
                                    Integramos meditación, ritual, formación y acompañamiento en una sola ruta para que
                                    tu cambio
                                    sea profundo y sostenible.
                                </p>
                                <p className="section-emphasis mb-0">
                                    Método claro + apoyo real = resultados que se sienten.
                                </p>
                                <div className="mt-4 d-flex justify-content-center">
                                    <PrimaryButton label="Quiero vivir la experiencia" fullWidth={true}
                                                   variant="secondary"/>
                                </div>
                            </div>
                        </Reveal>
                    </Container>
                </section>

                <Container>
                    <Reveal>
                        <SideImageBlock image={fotoPag7} imageAlt="Calma y lectura" imageLeft={false}
                                        contentVerticalAlign="center">
                            <div className="landing-copy">
                                <h2>
                                    Tu siguiente versión empieza con una decisión
                                </h2>
                                <p className="section-subtitle">Respira, suelta y vuelve a ti con una comunidad que te
                                    sostiene</p>
                                <p>
                                    Si has llegado hasta aquí, este puede ser tu momento para empezar un cambio real.
                                </p>
                                <p className="section-emphasis">Da el primer paso. Tu bienestar te está esperando.</p>
                                <PrimaryButton label="Entrar ahora en VibraHeka" fullWidth={true} variant="secondary"/>
                            </div>
                        </SideImageBlock>
                    </Reveal>
                </Container>
            </section>
        </div>
    );
}
