import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import Reveal from "@core/Presentation/Components/molecules/Reveal/Reveal";
import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import Logo from "@core/Presentation/Components/atoms/Logo/Logo";
import { Col, Container, Row } from "react-bootstrap";
import "./FreeClassesPage.scss";

import clasesGratuitas1 from "../../../../../../Assets/Images/clases-gratuitas-1.jpg";
import carmenClasesGratuitas from "../../../../../../Assets/Images/carmen-clases-gratuitas.jpg";

const WHATSAPP_URL = "https://chat.whatsapp.com/JIDmYL5hs5V5b0VwtewHdf?mode=gi_t";

function joinWhatsApp() {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
}

export default function FreeClassesPage() {
    return (
        <div className="free-classes-page">

            {/* ── Header ──────────────────────────────────────── */}
            <section className="fc-header text-center">
                <Container className="fc-header__inner px-3 px-sm-4">
                    <Logo alt="VibraHeka Logo" width={120} height={120} />

                    <p className="fc-header__eyebrow mt-3 mb-0">
                        Escucha lo que tu cuerpo te está diciendo
                    </p>

                    <h1 className="fc-header__title my-3">
                        Clases Gratuitas de Fisioterapia Energética
                    </h1>

                    <p className="fc-header__desc mx-auto mb-0">
                        Únete a mis <strong>Clases Gratuitas</strong> todos los{" "}
                        <strong>jueves a las 19:00 horas España</strong>, en vivo por{" "}
                        <strong>Instagram</strong>.
                    </p>

                    <div className="mt-4 mt-md-5">
                        <PrimaryButton
                            label="¡Súmate a las clases Gratuitas!"
                            variant="secondary"
                            onClick={joinWhatsApp}
                        />
                    </div>
                </Container>
            </section>

            {/* ── Body ────────────────────────────────────────── */}
            <section className="fc-body py-5">

                {/* ── What to learn ─────────────────────────────── */}
                <section className="fc-learn">
                    <Reveal>
                        <Container className="px-3 px-sm-4">

                            {/* Header centrado */}
                            <Row className="justify-content-center text-center mb-5">
                                <Col lg={8}>
                                    <h2>¿Qué vas a aprender?</h2>
                                    <p className="section-subtitle">
                                        Descubre cómo movimientos suaves y atención consciente pueden{" "}
                                        <strong>
                                            transformar tu relación con el dolor, el estrés y las emociones
                                            acumuladas
                                        </strong>
                                        .
                                    </p>
                                </Col>
                            </Row>

                            {/* Imagen izquierda + ítems derecha */}
                            <Row className="g-5 align-items-center">
                                <Col lg={5} md={12} className="fc-learn__image-col">
                                    <img
                                        className="fc-learn__image"
                                        src={clasesGratuitas1}
                                        alt="Fisioterapia Energética"
                                    />
                                </Col>

                                <Col lg={7} md={12} className="fc-learn__items">
                                    <div className="fc-item">
                                        <span className="fc-item__number">01</span>
                                        <h4 className="fc-item__title">
                                            Alivio inmediato de tensión y estrés
                                        </h4>
                                        <p className="fc-item__desc">
                                            Suelta rigidez en cuello, hombros y espalda, calma el sistema
                                            nervioso y sal del modo «alerta constante». Muchas personas
                                            sienten alivio durante la misma clase.
                                        </p>
                                    </div>

                                    <hr className="fc-divider" />

                                    <div className="fc-item">
                                        <span className="fc-item__number">02</span>
                                        <h4 className="fc-item__title">
                                            Comprender qué te está diciendo tu cuerpo
                                        </h4>
                                        <p className="fc-item__desc">
                                            Entiende por qué aparece el dolor o la incomodidad. Aprende a
                                            diferenciar tensión física, emocional y energética.
                                        </p>
                                    </div>

                                    <hr className="fc-divider" />

                                    <div className="fc-item">
                                        <span className="fc-item__number">03</span>
                                        <h4 className="fc-item__title">
                                            Herramientas simples para el día a día
                                        </h4>
                                        <p className="fc-item__desc">
                                            Ejercicios sentados, fáciles y aplicables que puedes usar en
                                            cualquier momento de tensión, dolor o ansiedad, sin experiencia
                                            previa.
                                        </p>
                                    </div>

                                    <div className="mt-5">
                                        <PrimaryButton
                                            label="Grupo Clases Gratuitas"
                                            variant="secondary"
                                            onClick={joinWhatsApp}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Reveal>
                </section>

                {/* ── Testimonials band ─────────────────────────── */}
                <section className="fc-testimonials-band">
                    <Container className="px-3 px-sm-4">
                        <Reveal>
                            <div className="text-center mb-5">
                                <h6 className="fc-eyebrow">Lo que dicen quienes ya experimentaron</h6>
                                <h2>Sentir es sanar</h2>
                            </div>

                            <Row className="g-4">
                                <Col lg={4} md={12}>
                                    <div className="fc-testimonial">
                                        <p className="fc-testimonial__text">
                                            "En la primera clase he entendido que mi cuerpo guardaba
                                            estrés. A las pocas semanas, el dolor de espalda disminuyó
                                            notablemente."
                                        </p>
                                        <p className="fc-testimonial__name">Maria L.</p>
                                    </div>
                                </Col>
                                <Col lg={4} md={12}>
                                    <div className="fc-testimonial">
                                        <p className="fc-testimonial__text">
                                            "He sentido alivio inmediato en cuello y hombros durante la
                                            misma clase. Llevo 2 meses y mi cuerpo se siente diferente."
                                        </p>
                                        <p className="fc-testimonial__name">Sofía P.</p>
                                    </div>
                                </Col>
                                <Col lg={4} md={12}>
                                    <div className="fc-testimonial">
                                        <p className="fc-testimonial__text">
                                            "Desde la primera clase he aprendido a escuchar lo que mi
                                            cuerpo me dice y a liberar lo guardado. Me siento más liviana
                                            y con menos ansiedad."
                                        </p>
                                        <p className="fc-testimonial__name">Ana S.</p>
                                    </div>
                                </Col>
                            </Row>
                        </Reveal>
                    </Container>
                </section>

                {/* ── CTA band ──────────────────────────────────── */}
                <section className="fc-cta-band">
                    <Container className="px-3 px-sm-4">
                        <Reveal>
                            <div className="fc-cta text-center py-4 py-md-5">
                                <h6 className="fc-eyebrow">No estás sola en esto</h6>
                                <h2>Tu cuerpo sabe sanarse</h2>
                                <p className="section-subtitle">Únete hoy</p>
                                <PrimaryButton
                                    label="Grupo Clases Gratuitas"
                                    variant="secondary"
                                    onClick={joinWhatsApp}
                                />
                            </div>
                        </Reveal>
                    </Container>
                </section>

                {/* ── About Carmen ──────────────────────────────── */}
                <Container className="px-3 px-sm-4">
                    <Reveal>
                        <div className="fc-about-section">
                        <SideImageBlock
                            image={carmenClasesGratuitas}
                            imageAlt="Carmen, terapeuta especializada en Fisioterapia Energética"
                            imageLeft={true}
                            contentVerticalAlign="center"
                        >
                            <div className="fc-about-copy">
                                <h2>
                                    Soy Carmen, terapeuta especializada en Fisioterapia Energética
                                </h2>
                                <p>
                                    Hace unos años tuve un cambio en mi vida de 180 grados. Me sentía
                                    frustrada, incomprendida, perdida, bloqueada. Pasaba mis días con
                                    miedo y no sabía qué iba a pasar con mi vida. Pero{" "}
                                    <strong>
                                        algo dentro de mí sabía que tenía que encontrarme a mí misma
                                    </strong>
                                    .
                                </p>
                                <p>
                                    Durante ese tiempo de transformación he estudiado terapias
                                    complementarias porque he descubierto que era mi pasión: Nutrición,
                                    Reiki, Sanación Energética, Biodinámica…{" "}
                                    <strong>
                                        Y creé una terapia única que combina lo físico y lo energético
                                    </strong>
                                    : la{" "}
                                    <em>
                                        <strong>Fisioterapia Energética</strong>
                                    </em>
                                    .
                                </p>
                                <p>
                                    Hoy, con{" "}
                                    <strong>
                                        más de 7 años de experiencia ayudando a cientos de personas
                                    </strong>
                                    , mi misión es acompañarte a reconectar contigo misma, liberar
                                    bloqueos y recuperar tu equilibrio natural.{" "}
                                    <strong>
                                        Porque creo que cada tensión, dolor o emoción acumulada es un
                                        mensaje que merece atención
                                    </strong>
                                    .
                                </p>
                                <PrimaryButton
                                    label="Grupo Clases Gratuitas"
                                    fullWidth={true}
                                    variant="secondary"
                                    onClick={joinWhatsApp}
                                />
                            </div>
                        </SideImageBlock>
                        </div>
                    </Reveal>
                </Container>

                {/* ── Footer logo ───────────────────────────────── */}
                <div className="fc-footer-logo text-center mt-5 pt-4">
                    <Logo alt="VibraHeka Logo" width={100} height={100} />
                </div>
            </section>
        </div>
    );
}
