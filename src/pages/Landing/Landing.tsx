import Logo from "../../components/atoms/Logo/Logo";
import SideImageBlock from "../../components/organisms/SideImageBlock/SideImageBlock";

import meditacion_cristales from "../../assets/images/meditacion_cristales.png";
import flor_de_loto from "../../assets/images/flor_de_loto.png";
import "./Landing.scss";
import VideoPlayer from "../../components/atoms/VideoPlayer/VideoPlayer";

export default function LandingPage() {
    return (
        <div className="container">
            {/* <Logo
                src="http://vibraheka.com/wp-content/uploads/2025/09/logo-vibrakeca3-1__1_-removebg-preview-1.png"
                alt="VibraHeka Logo"
                width="159"
                height="140" /> */}

            <SideImageBlock image={meditacion_cristales} imageLeft={true}>
                <h1>Vibraheka</h1>

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
            <SideImageBlock image={flor_de_loto} imageLeft={false}>
                <p>¿Qué es VibraHeka?</p>
                <b>Un espacio digital con alma humana.</b>
                <p>En Vibraheka creemos que el bienestar no se trata de desconectarse del mundo, sino de recontectarse consigo mismo.</p>
                <p>Creamos una comunidad done puedes aprender, compartir y crecer junto a otros que también buscan equilibro</p>
                <p>Sin juicios. Sin etiquetas. Solo presencia y práctica.</p>
            </SideImageBlock>
        </div>

    )
}