import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import { Container, Row } from "react-bootstrap";

export default function MaileeVergara() {
    return (
        <Container className="mt-5">
            <h1>Mailee Vergara</h1>
            <SideImageBlock image="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/mailee-vergara/profilepicture.png" imageLeft={true} imageVerticalAlign="center">
                <p>Guía en el camino de conexión interior y creadora del Método SENTIR, un enfoque basado en la conciencia emocional y la escucha honesta de lo que sucede dentro de ti.</p>
                <p>Mi recorrido espiritual me llevó a comprender que la transformación profunda no nace solo en la mente, sino en la relación que construimos con nuestras emociones y con la verdad del cuerpo.</p>
                <p>Hoy acompaño a las personas a volver a sí mismas, despertar su intuición y reconocer la medicina que ya habita en su interior para vivir con más confianza, paz y libertad.</p>
                <p className="subtitle">Cuando aprendemos a escuchar las emociones, ellas nos guían de regreso a la confianza, la paz y la libertad interior.</p>
            </SideImageBlock>
            <VideoPlayer src="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/mailee-vergara/video.mp4" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco sesiones individuales y procesos de acompañamiento en:</p>
            <Row>
                <Terapia therapistId="mailee-vergara" therapyId="lectura-del-alma" title="Lectura del Alma" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Una sesión de tarot energético para reconocer la energía con la que naciste, el aprendizaje principal de esta vida y los patrones que más influyen en tu camino.</p>
                        <p>No busca predecir el futuro, sino darte visión del presente para comprender tus bloqueos, anticipar lo que se repite y avanzar con más conciencia, coherencia y orientación personal.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Comprensión de tu mapa energético de origen y de tu aprendizaje de vida.</li>
                                <li>Detección de patrones repetitivos y de los disparadores que los activan.</li>
                                <li>Más claridad, calma y confianza para dar tus siguientes pasos.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 90 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="mailee-vergara" therapyId="vuelve-a-tu-centro" title="Programa Vuelve a tu Centro" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Un recorrido práctico y profundo para reconectarte contigo, liberar bloqueos emocionales y transformar lo que sientes en pasos concretos hacia la vida que deseas.</p>
                        <p>Basado en el Método SENTIR, te ayuda a reconocer tus emociones, comprender su mensaje, regularlas sin reprimirte y actuar desde tu centro con más presencia y verdad.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Comprensión del propósito de los bloqueos que repites y de cómo transformarlos.</li>
                                <li>Mayor capacidad para escuchar y regular tus emociones sin miedo ni culpa.</li>
                                <li>Un camino claro para recuperar calma interior, confianza y libertad emocional.</li>
                            </ul>
                            <strong>Duración del programa:</strong> 4 semanas más 3 de acompañamiento.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
            </Row>
        </Container>
    );
}
