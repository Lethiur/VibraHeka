import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import { Container, Row } from "react-bootstrap";


export default function LuisGalvis() {
    const therapistID = "32f57464-b0b1-70a2-57cf-b6771655ad93";
    return (
        <Container className="mt-5">
            <h1 className="mb-5">Luis Galvis</h1>
            <SideImageBlock image="https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/LuisGalvis/profilepicture.png" imageLeft={true}>
                <p>Sanador por vocación y convicción, acompaño desde hace muchos años procesos de transformación y reordenamiento vibracional en espacios y en personas, especialmente sensibles y neurodivergentes, ayudando a liberar energías densas, a restaurar el equilibrio interno, a limpiar y ordenar estructuras sutiles y a recuperar el flujo natural de la energía vital.</p>
                <p>Mi trabajo integra sanación energética y constelaciones familiares bajo un enfoque cuántico y multidimensional, integrando una mirada profunda, respetuosa y consciente del campo energético y, guiarte a reconectar contigo, con tu bienestar y fuerza interna, en espacios más ligeros, coherentes y armónicos.</p>
                <p className="subtitle">Si sientes que es tu momento...</p>
                <p>Te invito a explorar mis terapias, que encontraras mas abajo</p>
            </SideImageBlock>
            <h2>Un poco mas sobre mi</h2>
            <VideoPlayer src="https://vibraheka-user-material-default.s3.eu-west-1.amazonaws.com/LuisGalvis/video.mp4" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco sesiones individuales en:</p>
            <Row>
                <Terapia therapistId={therapistID} therapyId="armonizacion-energetica-de-personas" title="Armonización energética de personas" buttonOnClick={() => { }}>
                    <p>Para quienes buscan recuperar equilibrio, claridad y bienestar.</p>
                    <p>Trabajo sobre el campo energético vital, canales, centros y cuerpos sutiles, para liberar bloqueos, ordenar su vibración, restituir el equilibrio y facilitar estados de calma profunda.</p>
                    <p>Beneficios</p>
                    <ul>
                        <li>Liberación de cargas energéticas acumuladas y bloqueadas</li>
                        <li>Mayor claridad mental y estabilidad emocional</li>
                        <li>Sensación de ligereza interior, bienestar, equilibrio y vitalidad</li>
                    </ul>
                    <p>Duración de la sesión aproximada: 60 minutos.</p>
                </Terapia>
                <Terapia therapistId={therapistID} therapyId="armonizacion-energetica-de-negocios-y-espacios" title="Armonización energética de espacios y negocios pequeños" buttonOnClick={() => { }}>
                    <p>Para quienes buscan recuperar equilibrio, claridad y bienestar.</p>
                    <p>Trabajo sobre el campo energético vital, canales, centros y cuerpos sutiles, para liberar bloqueos, ordenar su vibración, restituir el equilibrio y facilitar estados de calma profunda.</p>
                    <p>Beneficios</p>
                    <ul>
                        <li>Liberación de cargas energéticas acumuladas y bloqueadas</li>
                        <li>Mayor claridad mental y estabilidad emocional</li>
                        <li>Sensación de ligereza interior, bienestar, equilibrio y vitalidad</li>
                    </ul>
                    <p>Duración de la sesión aproximada: 60 minutos.</p>
                </Terapia>
            </Row>
        </Container>
    );
}