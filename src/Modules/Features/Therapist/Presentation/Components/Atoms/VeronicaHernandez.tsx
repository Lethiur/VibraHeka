import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import { Container, Row } from "react-bootstrap";

export default function VeronicaHernandez() {
    return (
        <Container className="mt-5">
            <h1>Verónica Hernández</h1>
            <SideImageBlock image="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/veronica-hernandez/profilepicture.png" imageLeft={true} imageVerticalAlign="center">
                <p>Acompaño procesos de autoconocimiento profundo para liberar lo que ya no te pertenece y recuperar valía personal, equilibrio y plenitud.</p>
                <p>Mi enfoque integra mente, cuerpo, emociones y energía, con una mirada transpersonal y somática sostenida por más de 25 años de recorrido.</p>
                <p>Te propongo un espacio para indagar, comprender e integrar tu experiencia desde una presencia amorosa que te ayude a volver a ti.</p>
                <p className="subtitle">Nunca es tarde para volver a empezar.</p>
            </SideImageBlock>
            <VideoPlayer src="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/veronica-hernandez/video.mp4" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco sesiones individuales y encuentros vivenciales en:</p>
            <Row>
                <Terapia therapistId="veronica-hernandez" therapyId="terapia-transpersonal" title="Terapia Transpersonal" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Un proceso para ir más allá del personaje y conectar con tu mundo interior, integrando partes olvidadas, reprimidas o heridas que buscan ser vistas y escuchadas.</p>
                        <p>Trabajamos el plano físico, mental, emocional y energético, incorporando trabajo somático y regulación del sistema nervioso para localizar y liberar emociones atrapadas en el cuerpo.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor autoconocimiento e integración de tus luces y tus sombras.</li>
                                <li>Liberación de emociones atrapadas y mayor conexión con tu cuerpo.</li>
                                <li>Reconexión con tu sabiduría interna y tu verdadera esencia.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 75 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="veronica-hernandez" therapyId="lectura-de-aura" title="Lectura de Aura" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Una lectura e interpretación de la información que guarda tu campo electromagnético para comprender qué energía está más disponible y qué necesita ser atendido en este momento vital.</p>
                        <p>Se exploran chakras, bloqueos, habilidades, conexión espiritual, aprendizajes de vidas pasadas y posibles pactos, mientras se limpia el campo áurico para dejar una sensación más luminosa y vibrante.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor claridad sobre bloqueos, dones y pasos a seguir en tu proceso.</li>
                                <li>Profunda sensación de paz, limpieza y conexión espiritual.</li>
                                <li>Te llevas tu lectura en audio y las imágenes canalizadas para seguir integrando el mensaje.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 75 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="veronica-hernandez" therapyId="cursos-y-talleres-de-equilibrio-emocional-y-energetico" title="Cursos y talleres de equilibrio emocional y energético" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Taller vivencial para descubrir y liberar emociones atrapadas en el cuerpo mediante escritura, pintura intuitiva, movimiento corporal y trabajo de chakras.</p>
                        <p>Es un trabajo suave y profundo, guiado paso a paso, orientado a dar conciencia a lo que necesita ser atendido para recuperar ligereza y equilibrio emocional.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor conciencia de las emociones que necesitan ser liberadas.</li>
                                <li>Expresión corporal y energética en un entorno guiado y seguro.</li>
                                <li>Sensación de ligereza, bienestar y conexión contigo al terminar.</li>
                            </ul>
                            <strong>Duración del encuentro aproximada:</strong> 120 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
            </Row>
        </Container>
    );
}
