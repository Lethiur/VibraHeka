
import Bea from '../../../../../Assets/images/Terapeutas/Beatriz.png'
import Terapeuta from "../../../../../Core/Presentation/Components/molecules/Terapeuta/Terapeuta";

export default function TerapeutasHome() {
    return (
        <div className='container-fluid mb-5'>
            <h1 className='text-center pb-5'>Terapeutas</h1>

            <Terapeuta title="Beatriz" route="/terapeutas/beatriz-alonso" image={Bea}>
                <p>Terapeuta y Comunicadora Animal</p>
                <p>Te acompaño a descubrir lo que tu animal siente, piensa y necesita para mejorar la convivencia y el bienestar mutuo.</p>
            </Terapeuta>

            <Terapeuta title="Vera Lucya" route="/terapeutas/vera-lucya" image={Bea}>
                <p>Maestra de Empoderamiento Holístico, coach de feminidad para mujeres con mucha energía Yan, fundadora de la Escuela Prisma Vera</p>
                <p>Te acompaño a equilibrar tu energía femenina y masculina, para alcanzar tus más altos propósitos y lidiar con el Síndrome de Ovarios Poliquísticos y otras dolencias asociadas a tu centro de creación.</p>
            </Terapeuta>

            <Terapeuta title="Carmen Cost" route="/terapeutas/carmen-cost" image={Bea}>
                <p>Alquimista Integrativa (Terapeuta Holística)</p>
                <p>Mi propósito es acompañarte a transmutar tu dolor en fortaleza y despertar tu capacidad de superación para alcanzar el bienestar integral en tu día a día.</p>
            </Terapeuta>

            <Terapeuta title="Rocío Tirado" route="/terapeutas/rocio-tirado" image={Bea}>
                <p>Terapeuta Holística. Asesora de crianza y educación consciente</p>
                <p>Te acompaño a volver a tu verdadero Ser, donde la paz y el amor ya habitan. Desde esa conexión profunda, acompaño a personas, familias y educadores a vivir y criar desde la presencia y la conciencia.</p>
            </Terapeuta>

            <Terapeuta title="Verónica Hernández" route="/terapeutas/veronica-hernandez" image={Bea}>
                <p>Terapeuta Transpersonal y energética</p>
                <p>“La verdadera profesión del hombre consiste en conocerse a sí mismo” Hermann Hesse</p>
            </Terapeuta>

            <Terapeuta title="Mailee Vergara" route="/terapeutas/mailee-vergara" image={Bea}>
                <p>Guia en el camino de conexion interior. Creadora del metodo SENTIR, basado en la conciencia emocional</p>
                <p>Te acompaño a descubrir tu verdadero Ser, donde la paz y el amor ya habitan. Desde esa conexión profunda, acompaño a personas, familias y educadores a vivir y criar desde la presencia y la conciencia.</p>
            </Terapeuta>

            <Terapeuta title="Olga Lucy López López" route="/terapeutas/olga-lucy-lopez-lopez" image={Bea}>
                <p>Energía Sanadora</p>
                <p>“Tu campo se limpia, se sana y se protege. Tu  historia se ordena. Tu camino se abre.” Olga Lucy López López</p>
            </Terapeuta>

            <Terapeuta title="Belén Angella" route="/terapeutas/belen-angella" image={Bea}>
                <p>Yoga Terapéutico</p>
                <p>En un mundo ruidoso y rápido, te ayudo a volver a tu cuerpo y a calmar tu mente. “El yoga se adapta a tí, no tú al yoga” - Krishnamacharya</p>
            </Terapeuta>

            <Terapeuta title="Verónica Hernández" route="/terapeutas/veronica-hernandez" image={Bea}>
                <p>Terapeuta Transpersonal y energética</p>
                <p>“La verdadera profesión del hombre consiste en conocerse a sí mismo” Hermann Hesse</p>
            </Terapeuta>

            <Terapeuta title="Luis Galvis" route="/terapeutas/luis-galvis" image={Bea}>
                <p>Terapeuta Bioenergético Integral. Especializado en la armonización multidimensional de personas y espacios.</p>
                <p>Creo en el poder de la energía bien ordenada para transformar vidas y espacios.</p>
            </Terapeuta>

            <Terapeuta title="Mariela Popoca" route="/terapeutas/mariela-popoca" image={Bea}>
                <p>Tarotista</p>
                <p>Con el Tarot pongo sobre la mesa tu presente, las posibilidades que se están formando y las decisiones que pueden redirigir tu vida y transformarla por completo.</p>
            </Terapeuta>

            <Terapeuta title='Carmen Martin' route='/terapeutas/carmen-martin' image={Bea}>
                <p>Terapeuta Holística Creadora de la fisioterapia energética</p>
                <p>Te acompaño a reconectar con tu energía y activar tu poder de sanación.</p>
            </Terapeuta>


        </div>
    )
}