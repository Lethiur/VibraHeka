
import Bea from '../../assets/images/Terapeutas/Beatriz.png'
import PrimaryButton from '../../components/atoms/PrimaryButton/PrimaryButton'

export default function Terapeutas() {
    return (
        <div className='container-fluid mb-5'>
            <h1 className='text-center pb-5'>Terapeutas</h1>

            <div className='row gx-25 gy-3 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Beatriz</h2>
                        <p>Terapeuta y Comunicadora Animal</p>
                        <p>Te acompaño a descubrir lo que tu animal siente, piensa y necesita para mejorar la convivencia y el bienestar mutuo.</p>
                        <PrimaryButton label="Descubre su espacio" onClick={() => { }} variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>

            <div className='row gx-25 gy-5 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Vera Lucya Gonz&aacute;lez</h2>
                        <p>Maestra de Empoderamiento Holístico, coach de feminidad para mujeres con mucha energía Yan, fundadora de la Escuela Prisma Vera</p>
                        <p>Te acompaño a equilibrar tu energía femenina y masculina, para alcanzar tus más altos propósitos y lidiar con el Síndrome de Ovarios Poliquísticos y otras dolencias asociadas a tu centro de creación.</p>
                        <PrimaryButton label="Descubre su espacio" onClick={() => { }} variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>

            <div className='row gx-25 gy-5 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Carmen Cost </h2>
                        <p>Alquimista Integrativa (Terapeuta Holística)</p>
                        <p>Mi propósito es acompañarte a transmutar tu dolor en fortaleza y despertar tu capacidad de superación para alcanzar el bienestar integral en tu día a día.</p>
                        <PrimaryButton label="Descubre su espacio" onClick={() => { }} variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>

            <div className='row gx-25 gy-5 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Rocío Tirado</h2>
                        <p>Terapeuta Holística. Asesora de crianza y educación consciente</p>
                        <p>Te acompaño a volver a tu verdadero Ser, donde la paz y el amor ya habitan. Desde esa conexión profunda, acompaño a personas, familias y educadores a vivir y criar desde la presencia y la conciencia.</p>
                        <PrimaryButton label="Descubre su espacio" to='terapeutas/rocio-tirado' variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>

            <div className='row gx-25 gy-5 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Verónica Hernández</h2>
                        <p>Terapeuta Transpersonal y energética</p>
                        <p>“La verdadera profesión del hombre consiste en conocerse a sí mismo” Hermann Hesse</p>
                        <PrimaryButton label="Descubre su espacio" to='terapeutas/veronica-hernandez' variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>

            <div className='row gx-25 gy-5 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Mailee Vergara</h2>
                        <p>Guia en el camino de conexion interior. Creadora del metodo SENTIR, basado en la conciencia emocional</p>
                        <p>Te acompaño a descubrir tu verdadero Ser, donde la paz y el amor ya habitan. Desde esa conexión profunda, acompaño a personas, familias y educadores a vivir y criar desde la presencia y la conciencia.</p>
                        <PrimaryButton label="Descubre su espacio" to='terapeutas/mailee-vergara' variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>

            <div className='row gx-25 gy-5 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Olga Lucy L&oacute;pez L&oacute;pez</h2>
                        <p>Energía Sanadora</p>
                        <p>“Tu campo se limpia, se sana y se protege. Tu  historia se ordena. Tu camino se abre.” Olga Lucy López López</p>
                        <PrimaryButton label="Descubre su espacio" to='terapeutas-olga-lucy-lopez-lopez' variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>

            <div className='row gx-25 gy-5 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Bel&eacute;n Angella</h2>
                        <p>Yoga Terapéutico</p>
                        <p>En un mundo ruidoso y rápido, te ayudo a volver a tu cuerpo y a calmar tu mente. “El yoga se adapta a tí, no tú al yoga” - Krishnamacharya</p>
                        <PrimaryButton label="Descubre su espacio" to="/terapeutas/belen-angella" variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>

            <div className='row gx-25 gy-5 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Luis Galvis</h2>
                        <p>Terapeuta Bioenergético Integral. Especializado en la armonización multidimensional de personas y espacios.</p>
                        <p>Creo en el poder de la energía bien ordenada para transformar vidas y espacios.</p>
                        <PrimaryButton label="Descubre su espacio" to="/terapeutas/luis-galvis" variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>

            <div className='row gx-25 gy-5 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Mariela Popoca</h2>
                        <p>Tarotista</p>
                        <p>Con el Tarot pongo sobre la mesa tu presente, las posibilidades que se están formando y las decisiones que pueden redirigir tu vida y transformarla por completo.</p>
                        <PrimaryButton label="Descubre su espacio" to="/terapeutas/mariela-popoca" variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>

            <div className='row gx-25 gy-5 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Bel&eacute;n Angella</h2>
                        <p>Yoga Terapéutico</p>
                        <p>En un mundo ruidoso y rápido, te ayudo a volver a tu cuerpo y a calmar tu mente. “El yoga se adapta a tí, no tú al yoga” - Krishnamacharya</p>
                        <PrimaryButton label="Descubre su espacio" to="/terapeutas/belen-angella" variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>

            <div className='row gx-25 gy-5 d-flex justify-content-center p-5 align-items-center'>
                <img src={Bea} className='col col-lg-3 col-md-5 col-sm-12' />
                <div className='col col-lg-8 col-md-6 col-sm-12'>
                    <div className='p-2'>
                        <h2>Carmen Mart&iacute;n</h2>
                        <p>Terapeuta Holística Creadora de la fisioterapia energética</p>
                        <p>Te acompaño a reconectar con tu energía y activar tu poder de sanación.</p>
                        <PrimaryButton label="Descubre su espacio" to="/terapeutas/carmen-martin" variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    )
}