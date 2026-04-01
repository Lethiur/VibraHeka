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
                <p>Sanador por vocación y convicción, acompaño desde hace muchos años procesos de transformación y reordenamiento vibracional en espacios y en personas, especialmente sensibles y neurodivergentes, ayudando a liberar energías densas, a restaurar el equilibrio interno, a limpiar y ordenar estructuras sutiles y a recuperar el flujo natural de la energía vital.</p>
                <p>Mi trabajo integra sanación energética y constelaciones familiares bajo un enfoque cuántico y multidimensional, con una mirada profunda, respetuosa y consciente del campo energético para guiarte a reconectar contigo, con tu bienestar y fuerza interna, en espacios más ligeros, coherentes y armónicos.</p>
                <p className="subtitle">Si sientes que es tu momento...</p>
                <p>Te invito a explorar mis terapias, que encontrarás más abajo.</p>
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
