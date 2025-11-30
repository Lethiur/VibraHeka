import Logo from "../../components/atoms/Logo/Logo";
import SideImageBlock from "../../components/organisms/SideImageBlock/SideImageBlock";

import meditacion_cristales from "../../assets/images/meditacion_cristales.png";
import flor_de_loto from "../../assets/images/flor_de_loto.png";
import ascension from "../../assets/images/ascension.png"
import conciencia from "../../assets/images/conciencia.png"

import "./Landing.scss";
import VideoPlayer from "../../components/atoms/VideoPlayer/VideoPlayer";
import PrimaryButton from "../../components/atoms/PrimaryButton/PrimaryButton";
import { useState } from "react";

export default function LandingPage() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        console.log("Form submitted:", { name, email, password });
    };
    return (
        <div className="container display-flex flex-column align-items-center">
            <Logo
                src="http://vibraheka.com/wp-content/uploads/2025/09/logo-vibrakeca3-1__1_-removebg-preview-1.png"
                alt="VibraHeka Logo"
                width="159"
                height="140" />

            <SideImageBlock image={meditacion_cristales} imageLeft={true}>

                <p className="subtitle">
                    Tu espacio para parar, respirar y volver a ti.<br />
                </p>

                <p>     Una comunidad online pensada para cuidar tu bienestar interior, paso a paso
                    y con calma.</p>

                <p>
                    Prueba tu primer mes gratis y descubre c&oacute;mo puedes reconectar con tu energ&iacute;a
                    y recuperar ese equilibrio que tantas veces se pierde entre prisas, ruido y
                    obligaciones. Aqu&iacute; no vienes a correr como una res desbocada; vienes a
                    reencontrarte contigo mismo y a permitirte sentir, sin exigencias ni juicios.
                </p>

                <p>
                    En Vibraheka encontrar&aacute;s un espacio seguro y acogedor, donde cada sesi&oacute;n,
                    cada respiraci&oacute;n y cada momento est&aacute;n hechos para que vuelvas a tu centro.
                    Para que sueltes lo que pesa y te quedes con lo que de verdad te sostiene.
                </p>

                <p>
                    Contamos con <strong>terapeutas de distintas especialidades</strong> todos listos
                    para guiarte en tu camino interior. Cada uno aportar&aacute; su propia mirada,
                    su voz y su experiencia para ayudarte a crecer, sanar y reencontrar esa
                    fuerza tranquila que llevas dentro.
                </p>

                <p>
                    Aqu&iacute;, caminas a tu propio ritmo. Sin presiones. Sin ruido. Solo t&uacute;,
                    tu pausa y una comunidad que te acompa&ntilde;a con el coraz&oacute;n abierto.
                </p>
            </SideImageBlock>
            <div className="video-player">
                <VideoPlayer
                    src="http://vibraheka.com/wp-content/uploads/2025/11/Vsl_Carmen.mov"
                    poster="http://vibraheka.com/wp-content/uploads/2025/11/Vsl_Carmen.jpg"
                    controls={true}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    width="100%"
                    height="auto" />
            </div>
            <div className="button-holder">
                <PrimaryButton label={"Quiero unirme y probar gratis"} onClick={() => { }} variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
            </div>
            <div className="side-block-holder">
                <SideImageBlock image={flor_de_loto} imageLeft={false}>
                    <p>¿Qué es VibraHeka?</p>
                    <b>Un espacio digital con alma humana.</b>
                    <p>En Vibraheka creemos que el bienestar no se trata de desconectarse del mundo, sino de recontectarse consigo mismo.</p>
                    <p>Creamos una comunidad done puedes aprender, compartir y crecer junto a otros que también buscan equilibro</p>
                    <p>Sin juicios. Sin etiquetas. Solo presencia y práctica.</p>
                </SideImageBlock>
            </div>

            <SideImageBlock image={conciencia} imageLeft={true}>
                <h1>¿C&oacute;mo te acompañamos?</h1>
                <br />
                <p>En Vibraheka te guiamos en un proceso de reconexi&oacute;n con tu bienestar a través de contenidos, pr&aacute;cticas y espacios de encuentro que puedes vivir a tu ritmo.
                </p>
                <p>Cada experiencia —una meditación, una charla, una reflexión— está pensada para que pares un momento, respires y vuelvas a ti.</p>
                <p>No importa en qué punto estés: siempre hay un lugar desde donde empezar a vibrar en </p>
            </SideImageBlock>
            <SideImageBlock image={ascension} imageLeft={false}>
                <h1>¿Por qué unirte a esta Comunidad?</h1>
                <br />
                <p>Porque mereces sentirte acompañado/a de personas que vibran como tú</p>
                <p>Vibraheka es una comunidad consciente donde encontrarás apoyo, calma y conexión real.</p>
                <p>En comunidad, el bienestar deja de ser un esfuerzo y se convierte en una práctica natural</p>
                <p>Sin juicios. Sin etiquetas. Solo presencia y práctica.</p>
            </SideImageBlock>

            <div className="container-fluid justify-content-center">
                <div className="sign-up-form">

                    <form
                        onSubmit={handleSubmit}
                        className="p-4 bg-light rounded shadow-sm"
                    >
                        <h1>Quiero unirme y probar gratis</h1>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Nombre
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                className="form-control"
                                placeholder="Your full name"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">
                                Apellidos
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                className="form-control"
                                placeholder="Your full name"
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                className="form-control"
                                placeholder="you@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Contrase&ntilde;a
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    className="form-control"
                                    placeholder="********"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <PrimaryButton label="Unirme y probar gratis" onClick={() => handleSubmit()} variant="primary" disabled={false} fullWidth={true} />
                    </form>
                </div>
            </div>
        </div>

    )
}