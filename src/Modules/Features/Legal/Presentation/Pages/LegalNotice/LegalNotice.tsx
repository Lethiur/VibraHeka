import LegalPage from "@legal/Presentation/Components/LegalPage/LegalPage";

export default function LegalNotice() {
    return (
        <LegalPage title="Aviso Legal" lastUpdated="abril de 2026">

            <div className="legal-highlight">
                <p>
                    El presente Aviso Legal regula el acceso y uso de la plataforma VibraHeka, de
                    conformidad con la{" "}
                    <strong>
                        Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y
                        del Comercio Electrónico (LSSI-CE)
                    </strong>
                    .
                </p>
            </div>

            <h2>1. Identificación del titular</h2>
            <div className="legal-contact-block">
                <p><strong>Denominación:</strong> VibraHeka</p>
                <p><strong>Actividad:</strong> Plataforma de bienestar online, terapias energéticas y suscripciones digitales</p>
                <p><strong>Correo electrónico de contacto:</strong> <a href="mailto:hola@vibraheka.com">hola@vibraheka.com</a></p>
                <p><strong>Correo electrónico legal:</strong> <a href="mailto:legal@vibraheka.com">legal@vibraheka.com</a></p>
                <p><strong>Dominio:</strong> vibraheka.com</p>
            </div>

            <h2>2. Objeto y ámbito de aplicación</h2>
            <p>
                El presente Aviso Legal regula las condiciones de acceso y uso del sitio web y la
                plataforma VibraHeka (en adelante, «la Plataforma»), así como los servicios disponibles
                a través de ella. El acceso a la Plataforma implica la aceptación plena y sin reservas
                del presente Aviso Legal.
            </p>
            <p>
                VibraHeka se reserva el derecho a modificar el presente Aviso Legal en cualquier
                momento, siendo la versión publicada en la Plataforma la versión vigente en cada
                momento.
            </p>

            <h2>3. Propiedad intelectual e industrial</h2>
            <p>
                Todos los contenidos de la Plataforma —incluyendo, sin limitación, textos, gráficos,
                logotipos, iconos, imágenes, archivos de audio, vídeo, descargas digitales y
                compilaciones de datos— son propiedad de VibraHeka o de sus colaboradores y proveedores
                de contenido, y están protegidos por la legislación española e internacional sobre
                propiedad intelectual e industrial.
            </p>
            <p>
                Queda expresamente prohibida la reproducción total o parcial, distribución,
                comunicación pública, transformación o cualquier otra forma de explotación de los
                contenidos sin autorización previa y por escrito de VibraHeka.
            </p>
            <p>
                Los terapeutas que publican contenido en la Plataforma conservan los derechos de autor
                sobre sus obras, y otorgan a VibraHeka una licencia no exclusiva para publicarlos en
                la Plataforma mientras su colaboración esté vigente.
            </p>

            <h2>4. Condiciones de acceso y uso</h2>
            <p>
                El acceso a las funcionalidades básicas de la Plataforma es gratuito, si bien
                determinados servicios requieren registro y/o suscripción de pago. El usuario se
                compromete a:
            </p>
            <ul>
                <li>Hacer un uso lícito, correcto y no contrario a la buena fe de la Plataforma.</li>
                <li>No introducir, almacenar ni difundir contenidos ilícitos, ofensivos o que vulneren derechos de terceros.</li>
                <li>No realizar acciones que puedan dañar, inutilizar o sobrecargar la Plataforma.</li>
                <li>No intentar acceder a cuentas de otros usuarios ni a sistemas no autorizados.</li>
                <li>Facilitar datos verídicos en el proceso de registro.</li>
            </ul>

            <h2>5. Exclusión de responsabilidad</h2>
            <h3>5.1 Disponibilidad del servicio</h3>
            <p>
                VibraHeka no garantiza la disponibilidad continua e ininterrumpida de la Plataforma.
                Podemos suspender temporalmente el acceso por mantenimiento, actualización o causas
                técnicas ajenas a nuestra voluntad, sin que ello genere derecho a indemnización.
            </p>
            <h3>5.2 Contenido de terceros</h3>
            <p>
                La Plataforma puede contener enlaces o referencias a sitios de terceros. VibraHeka no
                controla ni es responsable del contenido de dichos sitios, y la inclusión de un enlace
                no implica ninguna aprobación o asociación con el sitio enlazado.
            </p>
            <h3>5.3 Consejo médico</h3>
            <p>
                Los contenidos y servicios de VibraHeka tienen carácter complementario y de bienestar
                general. <strong>No constituyen diagnóstico, tratamiento ni consejo médico.</strong>{" "}
                Consulta siempre a un profesional sanitario para cuestiones de salud.
            </p>

            <h2>6. Tratamiento de datos personales</h2>
            <p>
                El tratamiento de los datos personales de los usuarios se rige por nuestra{" "}
                <a href="/politica-de-privacidad">Política de Privacidad</a>, que forma parte
                integrante del presente Aviso Legal.
            </p>

            <h2>7. Legislación aplicable y jurisdicción</h2>
            <p>
                El presente Aviso Legal se rige por la legislación española. Para la resolución de
                cualquier controversia derivada del acceso o uso de la Plataforma, las partes se
                someten, con renuncia expresa a cualquier otro fuero, a los Juzgados y Tribunales
                españoles competentes.
            </p>
            <p>
                En el caso de que el usuario tenga la condición de consumidor, serán de aplicación
                las normas imperativas de protección al consumidor de su país de residencia dentro
                de la Unión Europea.
            </p>
            <p>
                La Comisión Europea pone a disposición de los consumidores europeos una plataforma
                de resolución de litigios en línea:{" "}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                    ec.europa.eu/consumers/odr
                </a>
                .
            </p>

        </LegalPage>
    );
}
