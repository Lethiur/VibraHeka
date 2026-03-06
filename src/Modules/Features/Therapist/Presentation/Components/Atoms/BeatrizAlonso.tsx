import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { BookingModal } from "@core/Presentation/Components/organisms/BookingModal/BookingModal";

export default function BeatrizAlonso() {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedTherapy, setSelectedTherapy] = useState<{ therapyId: string, therapistId: string } | null>(null);

    const handleOpenBooking = (therapyId: string, therapistId: string) => {
        setSelectedTherapy({ therapyId, therapistId });
        setShowBookingModal(true);
    };

    const handleCloseBooking = () => {
        setShowBookingModal(false);
        setSelectedTherapy(null);
    };
    return (
        <Container>
            <h1>Beatriz Alonso</h1>
            <SideImageBlock image="https://vibraheka-email-templates-vh-050-trial-perio-prod.s3.eu-west-1.amazonaws.com/beatriz/profilepicture.png" imageLeft={true}>
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
            <VideoPlayer src="https://vibraheka-email-templates-vh-050-trial-perio-prod.s3.eu-west-1.amazonaws.com/beatriz/video.mp4" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco acompañamiento (sesiones individuales) y formación en:</p>
            <div className="row d-flex justify-content-center align-items-center">

                <Terapia title="Comunicación Animal Telepática" therapyId="comunicacion-animal" therapistId="02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e" buttonOnClick={() => handleOpenBooking("comunicacion-animal", "02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e")}>
                    <Terapia.Text>
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
                    </Terapia.Text>

                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            más armonía y equilibrio en casa, comprensión profunda, conexión con tu animal.
                            <br /><br />
                            <strong>Duración de la sesión aproximada:</strong> 60-90 minutos.

                        </div>
                    </Terapia.Benefits>



                </Terapia>


                <Terapia title="Cirugía / Limpieza energética para animales." therapyId="cirugia-energetica" therapistId="02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e" buttonOnClick={() => handleOpenBooking("cirugia-energetica", "02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e")}>
                    <Terapia.Text>
                        <ul>
                            <li>Libera memorias energéticas, traumas y cargas que afectan el comportamiento o la
                                salud.
                            </li>
                            <li>Restablece la armonía del campo energético y favorece la autocuración natural.</li>
                            <li>Extrae del animal, sus humano y su entorno, energías densas parasitarias que puedan
                                estar afectándole.
                            </li>
                        </ul>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong> renovación energética, mayor vitalidad, equilibrio integral y
                            acompañamiento respetuoso en procesos de sanación.
                            <br /><br />
                            <strong>Duración de la sesión aproximada:</strong> 60-90 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>


            </div>

            {selectedTherapy && (
                <BookingModal
                    show={showBookingModal}
                    onHide={handleCloseBooking}
                    therapyId={selectedTherapy.therapyId}
                    therapistId={selectedTherapy.therapistId}
                />
            )}
        </Container >
    );
}
