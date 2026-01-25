import Beatriz from "../../../../../../Assets/images/Terapeutas/Beatriz.png"
import SideImageBlock from "../../../../../../Core/Presentation/Components/organisms/SideImageBlock/SideImageBlock";
import VideoPlayer from "../../../../../../Core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";
import Terapia from "../../../../../../Core/Presentation/Components/molecules/Terapia/Terapia";


export default function VeraLucya() {
    return (
        <div>
            <h1>Vera Lucya González</h1>
            <SideImageBlock image={Beatriz} imageLeft={true}>
                <p>Luego de años dependiendo de pastillas anticonceptivas para regular mis hormonas, decidí encontrar el origen de mis desequilibrios hormonales, y descubrí que mis altos niveles de testosterona estaban asociados a mis niveles de energía Yan (polaridad activa o energía masculina)</p>
                <p>Me certifiqué en yoga, meditación, tantra y danza consciente para volver a conectar con mi energía femenina.</p>
                <p>Ahora, acompaño a mujeres que, como tú, son expertas en hacer, planificar y tomar la iniciativa, pero les cuesta recibir, descansar sin culpa o relacionarse con hombres que les sigan el paso.</p>
                <p>En nuestras sesiones miraremos juntas el origen de tu desbalance energético y hormonal, podrás conectar con tu cuerpo, placer y merecimiento a través de meditaciones tántricas, terapias y programas que atienden tu cuerpo físico, mental y energético.</p>
                <p className="subtitle">Porque como siempre digo: “la transformación espiritual no tiene que ser aburrida, vívela de forma integral, con gozo y con los pies en la Tierra”</p>
            </SideImageBlock>
            <VideoPlayer src="https://drive.google.com/file/d/1YoBFNXNQhtLSCMVSFDiSaegVrGr-9veO/view?usp=drive_link" />

            <h1>Mis terapias</h1>
            <p className="subtitle">Ofrezco sesiones individuales en:</p>
            <Terapia title="Terapia de Energía Sanadora" buttonOnClick={() => { }}>
                <p>Para mujeres que desean conectar con tu energía femenina y equilibrar su sistema endocrino y emocional</p>
                <p>¿Eres brillante, efectiva y poderosa, pero sientes que la auto-exigencia y el control te han desconectado de tu intuición, tu placer y tu paz?Terapia de Energía Sanadora</p>
                <p>¿Has vivido en modo "lucha” (exceso de energía masculina) y ahora sientes el agotamiento, la culpa y la desconexión con tu cuerpo?</p>
                <p>A menudo, este exceso de energía masculina se refleja también en tu cuerpo con desequilibrios como el Síndrome de Ovarios Poliquísticos (SOP), resistencia a la insulina, o niveles altos de testosterona.</p>

            </Terapia>
        </div>
    );
}