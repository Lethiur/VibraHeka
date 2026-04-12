import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import { Container, Row } from "react-bootstrap";
import { useState } from "react";
import { BookingModal } from "@core/Presentation/Components/organisms/BookingModal/BookingModal";
import VideoPlayer from "@/Core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";

export default function BeatrizAlonsoSexCoach() {
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
        <Container className="mt-5">
            <h1>Beatriz Alonso - Sex Coach</h1>
            <SideImageBlock image="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/beatriz/beatriz-sex-coach.jpeg" imageLeft={true} imageVerticalAlign="center">
                <p>Coach sexual holística y Promotora de Igualdad.</p>
                <p>Con más de 5 años de experiencia acompañando mujeres y hombres a superar bloqueos en su sexualidad y su vida.</p>
                <p>Acompaño a mujeres, hombres y parejas en procesos de sanación y transformación para vivir una sexualidad libre, consciente y plena.</p>
                <p>A través de un enfoque integrador —cuerpo, mente, emoción y energía— te guío a reconectar con tu placer, tu poder interior y tu autenticidad.</p>
                <p className="subtitle">Si sientes que este es tu momento, explora mis terapias dentro de Vibraheka y da el primer paso hacia tu bienestar.</p>
            </SideImageBlock>

            <VideoPlayer src="https://drive.google.com/file/d/14aS3xeN0w0O-GzgAlcyJQZd_qpMtJhVV/view?usp=drive_link" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco acompañamiento en programas de sesiones individuales:</p>
            <Row>
                <Terapia title="Programa para la Mujer" therapyId="programa-mujer" therapistId="02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e" buttonOnClick={() => handleOpenBooking("programa-mujer", "02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e")}>
                    <Terapia.Text>
                        <p>Un viaje de sanación, reconocimiento y empoderamiento femenino para transformar la percepción que tienes sobre ti misma.</p>
                        <p>Aprenderás a escuchar tu cuerpo desde un espacio seguro, abrazando tu sensualidad para transitar hacia una feminidad libre y auténtica.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Sanar bloqueos profundos y reescribir creencias limitantes que te impiden disfrutar plenamente de tu sexualidad.</li>
                                <li>Fortalecer la autoconfianza, fomentando un amor propio genuino y duradero.</li>
                                <li>Redescubrir el placer sin culpas, cultivando una conexión profunda con tu cuerpo para sentir como nunca antes.</li>
                                <li>Transformar tu energía femenina para vivir y relacionarte desde la autenticidad y el bienestar íntegro.</li>
                            </ul>
                        </div>
                    </Terapia.Benefits>
                </Terapia>

                <Terapia title="Programa para el Hombre" therapyId="programa-hombre" therapistId="02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e" buttonOnClick={() => handleOpenBooking("programa-hombre", "02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e")}>
                    <Terapia.Text>
                        <p>Un proceso de autoconocimiento íntimo para reconectar con tu energía sexual y tu potencial más allá del rendimiento físico.</p>
                        <p>Te guío para alinear mente, cuerpo y emoción desde un lugar enraizado, honesto y libre de exigencias o presiones externas.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Liberar tensiones acumuladas, bloqueos energéticos y superar disfunciones sexuales desde su raíz emocional.</li>
                                <li>Potenciar tu vitalidad natural, alejando la ansiedad por el rendimiento y restaurando la confianza en la intimidad.</li>
                                <li>Comprender de una forma sana y sin presiones tu propia respuesta sexual.</li>
                                <li>Construir una relación más consciente, honesta y plena tanto contigo mismo como con el entorno que te rodea.</li>
                            </ul>
                        </div>
                    </Terapia.Benefits>
                </Terapia>

                <Terapia title="Programa Intimidad de Pareja" therapyId="intimidad-pareja" therapistId="02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e" buttonOnClick={() => handleOpenBooking("intimidad-pareja", "02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e")}>
                    <Terapia.Text>
                        <p>Un espacio para renovar la conexión emocional y sexual, identificando y sanando aquellas dinámicas estancadas que cierran la intimidad.</p>
                        <p>A través de la escucha consciente y el juego seguro, redescubriréis vuestro deseo y exploraréis los rincones del vínculo afectivo y erótico.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mejorar la comunicación íntima, aprendiendo a expresar deseos y límites desde la vulnerabilidad y el respeto mutuo.</li>
                                <li>Superar las dinámicas rutinarias para reavivar genuinamente el deseo, la pasión y la complicidad.</li>
                                <li>Fomentar un espacio de confianza donde compartir exploraciones y vulnerabilidades sin juicios.</li>
                                <li>Co-crear una sexualidad en pareja verdaderamente consciente, llevándola a una dimensión mucho más libre, profunda y satisfactoria.</li>
                            </ul>
                        </div>
                    </Terapia.Benefits>
                </Terapia>

                <Terapia title="Programa de Recuperación Integral del Suelo Pélvico" therapyId="recuperacion-suelo-pelvico" therapistId="02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e" buttonOnClick={() => handleOpenBooking("recuperacion-suelo-pelvico", "02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e")}>
                    <Terapia.Text>
                        <p>Un espacio de cuidado y sanación para reconectar conscientemente con tu enraizamiento corporal y la vitalidad de tu suelo pélvico.</p>
                        <p>A través de la consciencia corporal y la liberación de tensiones, buscaremos devolverle la salud vibrante y el flujo natural de energía a tu centro.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Fortalecer, tonificar y flexibilizar la musculatura del suelo pélvico para mejorar tu bienestar diario.</li>
                                <li>Liberar las tensiones físicas profundas y los bloqueos energéticos o emocionales que se hayan alojado en tu centro pélvico.</li>
                                <li>Mejorar o prevenir síntomas físicos al tiempo que recuperas la confianza y la total seguridad en los procesos de tu propio cuerpo.</li>
                                <li>Reconectar con tu vitalidad base y expandir enormemente tu capacidad de sentir placer al habitarte plenamente.</li>
                            </ul>
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
