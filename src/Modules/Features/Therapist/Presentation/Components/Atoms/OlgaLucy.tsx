import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import { Container, Row } from "react-bootstrap";

export default function OlgaLucy() {
    return (
        <Container className="mt-5">
            <h1>Olga Lucy López López</h1>
            <SideImageBlock image="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/olga-lucy/profilepicture.png" imageLeft={true} imageVerticalAlign="center">
                <p>Acompaño a las personas a expandirse, recuperar equilibrio y vivir con mayor plenitud desde mi labor como sanadora, formadora y conversadora del alma.</p>
                <p>Ofrezco sesiones de sanación energética profunda para armonizar cuerpo físico, emocional, espiritual y energético, desbloqueando aquello que limita tu salud o tu camino.</p>
                <p>Mi propuesta integra sanación energética y constelaciones familiares para transformar no solo lo visible, sino también memorias, vínculos y dinámicas profundas.</p>
                <p className="subtitle">"Lo que no sanas, se repite."</p>
            </SideImageBlock>
            <VideoPlayer src="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/olga-lucy/video.mp4" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco sesiones individuales en:</p>
            <Row>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="preparacion-energetica-a-procesos-y-procedimientos-medicos" title="Preparación energética a procesos y procedimientos médicos" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Acompañamiento de alistamiento físico, emocional, mental y espiritual para tratamientos médicos o intervenciones quirúrgicas.</p>
                        <p>Mediante armonización de chakras, liberación de miedos, activación celular y procedimientos energéticos, se prepara tu campo para potenciar el resultado esperado.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor equilibrio integral antes de un procedimiento médico o quirúrgico.</li>
                                <li>Liberación de miedos y mejor preparación emocional ante el proceso.</li>
                                <li>Fortalecimiento del campo energético para acompañar la recuperación.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 75 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="orar-juntos" title="Orar juntos" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Espacio para orar desde la fe, conversar en paz con Dios o con tu jerarquía espiritual y reconectar con esperanza y sentido.</p>
                        <p>Se acompaña el proceso con visualización y la técnica “El pulsar de Dios” para activar un campo de calma, intención y presencia compartida.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor paz interior, esperanza y conexión espiritual.</li>
                                <li>Aprendizaje para orar desde la fe y no desde el miedo.</li>
                                <li>Espacio de acompañamiento para sostener tu intención con claridad y calma.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 30 o 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="corte-de-vinculos-contaminados" title="Corte de vínculos contaminados" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Sesión para liberar contaminaciones energéticas y vínculos que cargan tu día a día con pensamientos, emociones o influencias externas.</p>
                        <p>El proceso ayuda a comprender cómo proteger tu energía y recuperar ligereza frente a personas, situaciones, acciones o ambientes que drenan.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor limpieza y protección energética en tu vida cotidiana.</li>
                                <li>Liberación de cargas emocionales y mentales asociadas a vínculos contaminantes.</li>
                                <li>Más ligereza, claridad y expansión personal.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="exploracion-energetica" title="Exploración energética" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Sesión para explorar energéticamente ideas, situaciones o pensamientos y obtener una percepción más amplia antes de tomar decisiones.</p>
                        <p>A través de radiestesia, péndulo corporal o clásico y testeo con porcentajes, se consultan tus dudas desde el alma y tu jerarquía espiritual.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor claridad para tomar decisiones con paz y seguridad.</li>
                                <li>Acceso a una percepción distinta a lo que piensas, oyes o sientes en la superficie.</li>
                                <li>Conexión más profunda con tu intuición y guía espiritual.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 30 o 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="armonizacion-energetica-de-parejas-familias-o-equipos-organizacionales" title="Armonización energética de parejas, familias o equipos organizacionales" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Sesión de armonización para parejas, familias o equipos que buscan recuperar conexión, libertad y liviandad para coexistir en mayor plenitud.</p>
                        <p>Se trabaja el sistema como un solo ser integrando técnicas de sanación energética y observando la dinámica conjunta, incluso si asiste una sola persona en representación.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor sintonía y bienestar en vínculos afectivos, familiares u organizacionales.</li>
                                <li>Comprensión más profunda de la dinámica energética del grupo.</li>
                                <li>Recuperación de armonía, conexión y liviandad en la relación.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 90 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="desbloqueo-relacional-laboral-economico" title="Desbloqueo relacional, laboral y económico" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Proceso para liberar bloqueos en el área relacional, laboral o económica desde un enfoque energético y con constelaciones familiares.</p>
                        <p>Se trabaja aquello que limita tu capacidad de sanar, atraer vínculos equilibrados o proyectarte con más claridad en el trabajo y la economía.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor apertura para sanar y atraer relaciones más equilibradas.</li>
                                <li>Liberación de bloqueos que frenan tu proyección laboral o económica.</li>
                                <li>Más claridad interna para avanzar con seguridad en tu camino.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 90 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="ikigai-energetico" title="Ikigai energético" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Proceso para descubrir tu propósito de vida mientras sanas creencias, patrones y lealtades, y reescribes tu historia desde un enfoque energético y con constelaciones familiares.</p>
                        <p>Trabaja lo que te limita para que puedas reconocer con más claridad aquello que despiertas y aportas cuando haces lo que has venido a hacer.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor claridad sobre tu propósito y dirección vital.</li>
                                <li>Sanación de creencias, patrones y lealtades que frenan tu camino.</li>
                                <li>Proceso profundo para reescribir tu historia con más coherencia y sentido.</li>
                            </ul>
                            <strong>Duración del proceso:</strong> 5 sesiones de 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
            </Row>
        </Container>
    );
}
