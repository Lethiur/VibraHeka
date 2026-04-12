import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import { Container, Row } from "react-bootstrap";

export default function MarinaGarrido() {
    return (
        <Container className="mt-5">
            <h1>Marina De La Sen</h1>
            <SideImageBlock image="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/marina-garrido/profilepicture.png" imageLeft={true} imageVerticalAlign="center">
                <p>Acompaño procesos de crecimiento, equilibrio y sanación profunda integrando cuerpo, mente, emociones y conciencia.</p>
                <p>Mi camino une comprensión de la naturaleza humana, visión holística e investigación integrativa para ayudarte a transformar tu realidad desde la coherencia interna.</p>
                <p>Con herramientas prácticas y eficaces, te guío en un viaje de expansión y auto-sanación para que integres todas tus partes con más claridad y menos limitaciones.</p>
                <p className="subtitle">"Todo depende de ti, si cambias tu frecuencia, resultado de tu coherencia y alineación con tu propósito, cambia tu realidad."</p>
            </SideImageBlock>
            <VideoPlayer src="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/marina-garrido/video.mp4" poster="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/marina-garrido/profilepicture.png" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco sesiones individuales en:</p>
            <Row>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="pums-por-una-mejor-salud" title='PUMS: "Por Una Mejor Salud"' buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Terapia basada en Biomagnetismo Médico y Factores Cuánticos que utiliza comunicación bioenergética y testaje kinesiológico para detectar la causa raíz de síntomas y disfunciones.</p>
                        <p>Se centra especialmente en el sistema digestivo, analizando con precisión cada alteración y factor etiológico para orientar una corrección profunda sin métodos invasivos.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Detección precisa de alteraciones y causas raíz detrás de la sintomatología.</li>
                                <li>Acompañamiento específico para desequilibrios y molestias del sistema digestivo.</li>
                                <li>Abordaje no invasivo, sin efectos secundarios de tratamientos químicos.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 120 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="nutricion-a-la-carta" title="Nutrición a la carta" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Técnica basada en el genotipo y la epigenética de la persona que, mediante test kinesiológico y bioenergética, permite identificar la nutrición más adecuada para maximizar la salud.</p>
                        <p>Busca fortalecer y resetear la expresión genética a través de una alimentación personalizada, teniendo en cuenta la historia biológica, el grupo sanguíneo y el estilo de vida de cada persona.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor claridad sobre qué alimentación favorece realmente tu equilibrio y bienestar.</li>
                                <li>Apoyo para fortalecer tu salud desde una nutrición alineada con tu biología e historia personal.</li>
                                <li>Comprensión más profunda de hábitos, carencias y memorias asociadas a la alimentación.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 120 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="medicina-astral-y-despeje-de-interferencias" title="Medicina astral y despeje de interferencias" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Terapia enfocada en diagnosticar y reparar fenómenos psicoespirituales que afectan el flujo energético y la eficacia de cualquier proceso de sanación posterior.</p>
                        <p>Se trabajan aura, centros energéticos, emociones asociadas a patologías e interferencias externas como traumas, parásitos energéticos, pactos o vínculos que drenan tu energía.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor claridad y equilibrio en tu campo energético y emocional.</li>
                                <li>Limpieza de interferencias que pueden estar afectando tu salud y vitalidad.</li>
                                <li>Recuperación de energía personal y fortalecimiento del proceso de sanación integral.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 120 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="ciclos-de-charlas-divulgativas-y-masterclass" title="Ciclos de charlas divulgativas y masterclass" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Espacios formativos creados para acercarte conocimientos sobre salud, crecimiento personal y temas de difícil acceso desde una mirada clara, práctica y empoderadora.</p>
                        <p>Se abordan contenidos como Medicina Germánica, conflictos biológicos, disruptores endocrinos, luz azul, campos electromagnéticos, test kinesiológicos y otros temas clave para comprender mejor tu bienestar.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Más conocimiento y autonomía para tomar decisiones sobre tu salud y tu proceso personal.</li>
                                <li>Acceso a información difícil de encontrar explicada de forma comprensible y aplicada.</li>
                                <li>Mayor capacidad para entender cómo distintos factores impactan en tu biología y bienestar.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> charlas de 60 minutos y masterclass de 120 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="biodanza" title="Biodanza" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Sistema de autoconocimiento que utiliza música, movimiento corporal, emoción y presencia para desarrollar el potencial personal a través de la vivencia y la expresión del cuerpo.</p>
                        <p>Es un viaje de autodescubrimiento en movimiento que ayuda a integrar cuerpo, mente y emociones, con clases grabadas para que cada persona pueda vivir el proceso a su ritmo.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mejor relación entre cuerpo, mente y emociones.</li>
                                <li>Mayor expresión, liberación y gestión consciente de las emociones.</li>
                                <li>Cambio de patrones internos a través del movimiento, la música y la conexión con tu sentir natural.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 120 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
            </Row>
        </Container>
    );
}
