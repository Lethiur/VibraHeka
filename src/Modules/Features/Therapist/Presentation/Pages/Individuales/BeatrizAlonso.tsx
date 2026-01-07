import Beatriz from "../../../../../../Assets/images/Terapeutas/Beatriz.png"
import SideImageBlock from "../../../../../../Core/Presentation/Components/organisms/SideImageBlock/SideImageBlock.tsx";
import Terapia from "../../../../../../Core/Presentation/Components/molecules/Terapia/Terapia.tsx";
import VideoPlayer from "../../../../../../Core/Presentation/Components/atoms/VideoPlayer/VideoPlayer.tsx";

export default function BeatrizAlonso() {
    return (
        <div>
            <h1>Beatriz Alonso</h1>
            <SideImageBlock image={Beatriz} imageLeft={true}>
                <p>Terapeuta y Comunicadora Animal, formadora y autora del libro Tu Alma Animal. Con más de 10 años de
                    experiencia acompañando familias inter especies a mejorar su convivencia y formando personas
                    (particulares, voluntarios y profesionales) en comunicación animal telepática y otras terapias
                    complementarias para animales.
                    Mi propósito es reconectar a las personas con el alma y la sabiduría de los animales para crear
                    vínculos más conscientes, amorosos y equilibrados.
                    <br /><br />
                    <strong>Si sientes que este es tu momento...</strong><br /><br />
                    Explora mis terapias dentro de Vibraheka y da el primer paso hacia tu bienestar.</p>
            </SideImageBlock>
            <VideoPlayer src="https://drive.google.com/file/d/1ZpTKmKW8llfRWMZo2ziM3cXbVxlWwo_E/view?usp=drive_link" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco acompañamiento (sesiones individuales) y formación en:</p>
            <div className="row d-flex justify-content-center align-items-center">

                <Terapia title="Comunicación Animal Telepática" buttonOnClick={() => {
                }}>

                    <ul>
                        <li>Escuchar, comprender y responder a lo que tu animal siente, piensa y necesita. Actuar de
                            puente entre ambos para mejorar cuestiones del hogar.
                        </li>
                        <li>Fortalecer vuestro vínculo y resolver conflictos de comportamiento o convivencia desde la
                            empatía (cambios, enfermedades, últimos momentos, duelo, etc…).
                        </li>
                        <li>Con las formaciones; desarrollar tu intuición y confianza interior a través de una práctica
                            consciente y amorosa.
                        </li>
                    </ul>


                    <br /><br />
                    <p><strong>Beneficios:</strong> más armonía y equilibrio en casa, comprensión profunda, conexión con
                        tu animal.</p>
                    <p><strong>Duración de la sesión aproximada:</strong> 60-90 minutos.</p>

                </Terapia>


                <Terapia title="Cirugía / Limpieza energética para animales." buttonOnClick={() => {
                }}>
                    <p className="card-text">
                        <ul>
                            <li>Libera memorias energéticas, traumas y cargas que afectan el comportamiento o la
                                salud.
                            </li>
                            <li>Restablece la armonía del campo energético y favorece la autocuración natural.</li>
                            <li>Extrae del animal, sus humano y su entorno, energías densas parasitarias que puedan
                                estar afectándole.
                            </li>
                        </ul>

                        <br /><br />
                        <p><strong>Beneficios:</strong> renovación energética, mayor vitalidad, equilibrio integral y
                            acompañamiento respetuoso en procesos de sanación.</p>
                        <p><strong>Duración de la sesión aproximada:</strong> 60-90 minutos.</p>
                    </p>
                </Terapia>


            </div>
        </div>
    );
}