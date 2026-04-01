import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import { Container, Row } from "react-bootstrap";
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
            <SideImageBlock image="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/beatriz/profilepicture.png" imageLeft={true} imageVerticalAlign="center">
                <p>Terapeuta y Comunicadora Animal, formadora y autora del libro Tu Alma Animal. Con más de 10 años de experiencia acompañando familias interespecies a mejorar su convivencia y formando personas en comunicación animal telepática y terapias complementarias para animales.</p>
                <p>Mi propósito es reconectar a las personas con el alma y la sabiduría de los animales para crear vínculos más conscientes, amorosos y equilibrados.</p>
                <p className="subtitle">Si sientes que este es tu momento...</p>
                <p>Explora mis terapias dentro de Vibraheka y da el primer paso hacia tu bienestar.</p>
            </SideImageBlock>
            <VideoPlayer src="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/beatriz/video.mp4" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco acompañamiento (sesiones individuales) y formación en:</p>
            <Row>
                <Terapia title="Comunicación Animal Telepática" therapyId="comunicacion-animal" therapistId="02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e" buttonOnClick={() => handleOpenBooking("comunicacion-animal", "02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e")}>
                    <Terapia.Text>
                        <p>Sesiones para escuchar, comprender y responder a lo que tu animal siente, piensa y necesita, actuando de puente entre ambos.</p>
                        <p>Favorece la convivencia, fortalece el vínculo y ayuda a abordar cambios, enfermedades, últimos momentos o procesos de duelo desde la empatía.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Más armonía y equilibrio en casa.</li>
                                <li>Comprensión profunda de lo que tu animal necesita.</li>
                                <li>Mayor conexión y fortalecimiento del vínculo.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60-90 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>

                <Terapia title="Cirugía / Limpieza energética de animales" therapyId="cirugia-energetica" therapistId="02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e" buttonOnClick={() => handleOpenBooking("cirugia-energetica", "02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e")}>
                    <Terapia.Text>
                        <p>Terapia para liberar memorias energéticas, traumas y cargas que pueden estar afectando la salud o el comportamiento del animal.</p>
                        <p>Trabaja sobre el campo energético del animal, su humano y su entorno para restaurar la armonía y favorecer la autocuración natural.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Renovación energética y mayor vitalidad.</li>
                                <li>Equilibrio integral del animal y su entorno.</li>
                                <li>Acompañamiento respetuoso en procesos de sanación.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60-90 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
            </Row>

            {selectedTherapy && (
                <BookingModal
                    show={showBookingModal}
                    onHide={handleCloseBooking}
                    therapyId={selectedTherapy.therapyId}
                    therapistId={selectedTherapy.therapistId}
                />
            )}
        </Container>
    );
}
