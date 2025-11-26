import Logo from "../../components/atoms/Logo/Logo";
import VideoPlayer from "../../components/atoms/VideoPlayer/VideoPlayer";
import PrimaryButton from "../../components/atoms/PrimaryButton/PrimaryButton";

import "./Landing.scss";

export default function LandingPage() {
    return (
        <div className="container">
            <Logo
                src="http://vibraheka.com/wp-content/uploads/2025/09/logo-vibrakeca3-1__1_-removebg-preview-1.png"
                alt="VibraHeka Logo"
                width="159"
                height="140" />

            <h2 className="d-flex justify-content-center align-items-center">Tu espacio para parar, respirar y volver a ti.</h2>
            <h3 className="d-flex justify-content-center align-items-center">Una comunidad online para cuidar tu bienestar interior.</h3>
            <p><i><span>Prueba tu primer mes gratis y descubre cómo reconectar con tu energía y tu equilibrio, acompañado de personas que buscan lo mismo que tú.</span></i></p>
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
                <div className="button d-flex justify-content-center align-items-center">
                    <PrimaryButton
                        label="Quiero probar gratis"
                        variant="primary"
                        fullWidth
                        onClick={() => console.log("Vamos allá, cowboy")}
                    />
                </div>

            </div>

            <div className="formulario d-flex justify-content-center align-items-center">
                <h1>Unete a la experiencia</h1>
            </div>

        </div>

    )
}