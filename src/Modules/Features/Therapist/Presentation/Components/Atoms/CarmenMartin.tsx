import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import { Container, Row } from "react-bootstrap";

export default function CarmenMartin() {
    return (
        <Container className="mt-5">
            <h1>Carmen Martin</h1>
            <SideImageBlock image="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/carmen-martin/profilepicutre.png" imageLeft={true} imageVerticalAlign="center">
                <p>Acompaño a las personas a liberar bloqueos energéticos, aliviar el dolor físico y recuperar su vitalidad.</p>
                <p>Mi trabajo parte de una escucha profunda del cuerpo, los fluidos y la energía que los habita, permitiendo que las emociones encuentren espacio para transformarse.</p>
                <p>En cada sesión te acompaño desde la presencia para que lo estancado vuelva a fluir y puedas sentirte más ligera, más tú.</p>
                <p className="subtitle">“Cuando la energía fluye, el cuerpo recuerda su propio equilibrio.”</p>
            </SideImageBlock>
            <VideoPlayer src="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/carmen-martin/video.mp4" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco sesiones individuales y programas de acompañamiento en:</p>
            <Row>
                <Terapia therapistId="carmen-martin" therapyId="fisioterapia-energetica" title="Fisioterapia Energética" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Terapia que combina sanación energética y biodinámica para trabajar con los ritmos y la energía natural del cuerpo, liberando bloqueos y tensiones.</p>
                        <p>Se enfoca en relajar tensiones físicas como espalda, cervicales, piernas, hombros, manos o brazos, y en restablecer la armonía entre cuerpo y mente.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Liberación de tensiones físicas y musculares.</li>
                                <li>Recuperación del flujo energético y mayor vitalidad.</li>
                                <li>Armonía física, emocional y espiritual de forma progresiva.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="carmen-martin" therapyId="pendulo-hebreo" title="Péndulo Hebreo" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Técnica que utiliza un péndulo y un idioma sagrado de símbolos para armonizar la energía del cuerpo y de los chakras.</p>
                        <p>Ayuda a desbloquear información energética antes de que se manifieste como enfermedad y está especialmente indicada en momentos de cansancio, estrés, insomnio, ansiedad o desequilibrio energético.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Limpieza profunda del aura y equilibrio de chakras.</li>
                                <li>Alivio del agotamiento físico y mental.</li>
                                <li>Mayor bienestar, armonía emocional y conexión con tu esencia.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="carmen-martin" therapyId="reiki-qi-gong" title="Reiki Qi Gong" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Terapia que combina Reiki Usui con meridianos y puntos de acupuntura para desbloquear la energía del cuerpo y equilibrar los chakras.</p>
                        <p>Está dirigida a quienes buscan relajación, equilibrio emocional, energía renovada y bienestar integral, especialmente en momentos de estrés, cansancio o desarmonía.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Reducción del estrés y sensación profunda de paz.</li>
                                <li>Mayor vitalidad, claridad mental y energía renovada.</li>
                                <li>Armonización de emociones, chakras y órganos.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
            </Row>
        </Container>
    );
}
