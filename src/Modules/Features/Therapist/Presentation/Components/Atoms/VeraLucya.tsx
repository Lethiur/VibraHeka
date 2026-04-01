import SideImageBlock from "@core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import Terapia from "@core/Presentation/Components/molecules/Terapia/Terapia";
import { Container, Row } from "react-bootstrap";

export default function VeraLucya() {
    return (
        <Container className="mt-5">
            <h1>Vera Lucya González</h1>
            <SideImageBlock image="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/vera-lucya/profilepicture.png" imageLeft={true} imageVerticalAlign="center">
                <p>Tras vivir en mi propio cuerpo los efectos del desbalance hormonal, inicié un camino de búsqueda para comprender el origen energético y emocional de lo que me ocurría.</p>
                <p>Me formé en yoga, meditación, tantra y danza consciente para reconectar con mi energía femenina y crear un enfoque integrador entre cuerpo, mente y espíritu.</p>
                <p>Hoy acompaño a mujeres que sostienen mucho, hacen mucho y desean volver a conectar con su intuición, su placer, su cuerpo y su paz interior.</p>
                <p className="subtitle">Porque como siempre digo: "la transformación espiritual no tiene que ser aburrida, vívela de forma integral, con gozo y con los pies en la Tierra"</p>
            </SideImageBlock>
            <VideoPlayer src="https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/vera-lucya/video.mp4" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco sesiones individuales en:</p>
            <Row>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="terapia-energia-sanadora" title="Mentoría de Liderazgo y conexión femenina interior" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Mentoría dirigida a mujeres que desean reconectar con su energía femenina y recuperar equilibrio hormonal y emocional.</p>
                        <p>Trabajamos el origen del desbalance en cuerpo, mente y espíritu para salir del modo lucha, soltar la autoexigencia y volver a conectar con la intuición, el placer y la paz interior.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor conexión con tu cuerpo y tu energía femenina.</li>
                                <li>Más regulación emocional, placer y paz interior.</li>
                                <li>Equilibrio entre energía femenina y masculina con acompañamiento respetuoso en procesos de desbalance hormonal.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="meditaciones-tantricas-de-abundancia" title="Meditaciones tántricas de abundancia" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Una práctica espiritual para mujeres que desean transformar su relación con el dinero, el placer y el merecimiento.</p>
                        <p>A través de meditaciones tántricas trabajamos bloqueos de escasez y aprendemos a recibir con mayor apertura, gozo y conciencia.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Transmutar creencias de escasez, sacrificio y lucha asociadas al dinero.</li>
                                <li>Activar tu energía vital creadora de abundancia.</li>
                                <li>Crear un nuevo concepto de abundancia ligado al placer, al gozo y al merecimiento.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
                <Terapia therapistId="6295b434-c021-70b4-3aa8-20b88c196a8a" therapyId="sanando-el-femenino-self" title="Sanando el femenino SELF" buttonOnClick={() => { }}>
                    <Terapia.Text>
                        <p>Un programa intensivo para mujeres que desean vivir su feminidad con autenticidad, sin estereotipos de belleza ni exigencias imposibles.</p>
                        <p>Trabajamos cuerpo, identidad y sabiduría femenina para sanar la relación contigo misma, comprender la raíz de desequilibrios hormonales o ginecológicos y abrir un camino de auto-sanación y guía para otras mujeres a través de 8 sesiones, material de estudio, bibliografía y 1 sesión personalizada.</p>
                    </Terapia.Text>
                    <Terapia.Benefits>
                        <div className="mb-2">
                            <strong>Beneficios:</strong>
                            <ul>
                                <li>Mayor conexión con tu feminidad, sensualidad y comodidad con tu cuerpo tal como es.</li>
                                <li>Menos juicio, culpa y autoexigencia en tu forma de habitarte y priorizarte.</li>
                                <li>Más comprensión de tu salud hormonal, tu bienestar femenino y tu capacidad de auto-sanación.</li>
                            </ul>
                            <strong>Duración de la sesión aproximada:</strong> 60 minutos.
                        </div>
                    </Terapia.Benefits>
                </Terapia>
            </Row>
        </Container>
    );
}
