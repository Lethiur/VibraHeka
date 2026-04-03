import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import { Container, Row } from "react-bootstrap";

export default function MaileeVergara() {
    return (
        <Container className="mt-5">
            <h1>Mailee Vergara</h1>
            <SideImageBlock image="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/mailee-vergara/profilepicture.png" imageLeft={true} imageVerticalAlign="center">
                <p>Soy guía en el camino de conexión interior y liderazgo personal, y acompaño a mujeres que se han perdido entre responsabilidades, rutinas y exigencias a volver a escucharse de verdad.</p>
                <p>Mi experiencia me llevó a comprender que la vida siempre habla a través de las emociones, y que cuando aprendemos a mirarlas con honestidad recuperamos claridad, paz y dirección.</p>
                <p>Hoy acompaño procesos de reconexión con la esencia, la intuición y la verdad interior para transformar la realidad desde adentro hacia afuera con más conciencia y suavidad.</p>
                <p className="subtitle">Porque cuando vuelves a tu centro, la vida vuelve a fluir contigo.</p>
            </SideImageBlock>
            <VideoPlayer src="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/mailee-vergara/video.mp4" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco sesiones individuales y procesos de acompañamiento en:</p>
            <Row>
                <Terapia therapistId="mailee-vergara" therapyId="lectura-del-alma" title="Lectura del Alma" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Una sesión de tarot como espejo del alma para comprender qué mensaje te está mostrando tu realidad, qué aprendizaje hay detrás de lo que vives y con qué energía viniste a expresarte.</p>
                        <p>No predice el futuro: te ofrece visión del presente para reconocer patrones mentales y emocionales, entender por qué se repiten ciertas experiencias y avanzar con más conciencia y coherencia.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Comprensión de tu mapa energético de origen y de tu aprendizaje de vida.</li>
                                <li>Detección de patrones repetitivos y de los disparadores que los activan.</li>
                                <li>Más claridad, confianza y orientación para dar tus siguientes pasos.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 90 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="mailee-vergara" therapyId="armonizaciones-energeticas" title="Armonizaciones energéticas" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Un encuentro de equilibrio interior en el que utilizo el péndulo como canal de conexión sutil para leer y armonizar la energía que se mueve dentro de ti.</p>
                        <p>Este proceso te acompaña a liberar bloqueos, recuperar tu centro y abrir espacio a una sensación profunda de calma, claridad y alineación entre cuerpo, emoción y energía.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Liberación de bloqueos energéticos y mayor sensación de calma interior.</li>
                                <li>Más claridad para observar lo que vives desde una nueva perspectiva.</li>
                                <li>Mayor alineación entre cuerpo, emoción y energía para actuar con más conciencia.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="mailee-vergara" therapyId="vuelve-a-tu-centro" title="Programa Vuelve a tu Centro" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Un recorrido práctico y profundo para pasar de la confusión y el agotamiento a un estado de mayor comprensión, presencia y coherencia interior.</p>
                        <p>A través de la observación, la respiración consciente y el trabajo con tus emociones, aprendes a reconocer lo que ya no resuena y a dar pasos reales hacia una forma de vivir más alineada contigo.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor comprensión de los bloqueos emocionales y mentales que te alejan de ti.</li>
                                <li>Más presencia, equilibrio y capacidad para escucharte sin juicio.</li>
                                <li>Un camino claro para vivir con más coherencia, paz y libertad interior.</li>
                            </ul>
                            <strong>Duración del programa:</strong> 4 semanas más 2 encuentros de seguimiento.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
            </Row>
        </Container>
    );
}
