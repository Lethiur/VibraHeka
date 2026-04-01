import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import { Container, Row } from "react-bootstrap";

export default function LuisGalvis() {
    const therapistID = "32f57464-b0b1-70a2-57cf-b6771655ad93";

    return (
        <Container className="mt-5">
            <h1 className="mb-5">Luis Galvis</h1>
            <SideImageBlock image="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/luis-galvis/profilepicture.png" imageLeft={true} imageVerticalAlign="center">
                <p>Sanador por vocación y convicción, acompaño procesos de transformación y reordenamiento vibracional en personas y espacios, especialmente sensibles y neurodivergentes.</p>
                <p>Mi trabajo integra sanación energética y constelaciones familiares para liberar energías densas, restaurar el equilibrio interno y ayudarte a recuperar el flujo natural de tu energía vital.</p>
                <p>Te acompaño desde una mirada profunda y respetuosa para que reconectes con tu bienestar, tu fuerza interna y espacios más ligeros, coherentes y armónicos.</p>
                <p className="subtitle">Si sientes que es tu momento...</p>
            </SideImageBlock>
            <h2>Un poco más sobre mí</h2>
            <VideoPlayer src="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/luis-galvis/video.mp4" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco sesiones individuales en:</p>
            <Row>
                <Terapia therapistId={therapistID} therapyId="armonizacion-energetica-de-personas" title="Armonización energética de personas" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Para quienes buscan recuperar equilibrio, claridad y bienestar.</p>
                        <p>Trabajo sobre el campo energético vital, canales, centros y cuerpos sutiles, para liberar bloqueos, ordenar su vibración, restituir el equilibrio y facilitar estados de calma profunda.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Liberación de cargas energéticas acumuladas y bloqueadas</li>
                                <li>Mayor claridad mental y estabilidad emocional</li>
                                <li>Sensación de ligereza interior, bienestar, equilibrio y vitalidad</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId={therapistID} therapyId="armonizacion-energetica-de-negocios-y-espacios" title="Armonización energética de espacios y negocios pequeños" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Para quienes buscan recuperar equilibrio, claridad y bienestar.</p>
                        <p>Trabajo sobre el campo energético vital, canales, centros y cuerpos sutiles, para liberar bloqueos, ordenar su vibración, restituir el equilibrio y facilitar estados de calma profunda.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Liberación de cargas energéticas acumuladas y bloqueadas</li>
                                <li>Mayor claridad mental y estabilidad emocional</li>
                                <li>Sensación de ligereza interior, bienestar, equilibrio y vitalidad</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
            </Row>
        </Container>
    );
}
