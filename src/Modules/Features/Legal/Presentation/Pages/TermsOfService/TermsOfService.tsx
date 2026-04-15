import LegalPage from "@legal/Presentation/Components/LegalPage/LegalPage";

export default function TermsOfService() {
    return (
        <LegalPage title="Términos y Condiciones" lastUpdated="abril de 2026">

            <div className="legal-highlight">
                <p>
                    Los presentes Términos y Condiciones regulan la relación contractual entre
                    VibraHeka y los usuarios que contratan sus servicios de suscripción. Al completar
                    el registro y contratar cualquier plan de pago, el usuario acepta íntegramente
                    estos términos. Si no los aceptas, no utilices los servicios de pago.
                </p>
            </div>

            <h2>1. Descripción del servicio</h2>
            <p>
                VibraHeka es una plataforma digital de bienestar que ofrece acceso a sesiones con
                terapeutas especializados en terapias energéticas, meditación y acompañamiento
                emocional, así como a contenidos exclusivos de formación y bienestar.
            </p>
            <p>
                Los servicios se prestan íntegramente a través de Internet. Para acceder a los
                servicios de pago es necesario disponer de una cuenta registrada y una suscripción
                activa.
            </p>

            <h2>2. Registro y cuenta de usuario</h2>
            <p>
                Para contratar nuestros servicios debes registrarte proporcionando información
                veraz, completa y actualizada. Eres responsable de mantener la confidencialidad
                de tus credenciales de acceso y de todas las actividades que ocurran bajo tu cuenta.
            </p>
            <p>
                VibraHeka se reserva el derecho a suspender o cancelar cuentas que incumplan estos
                Términos, faciliten información falsa o realicen un uso fraudulento del servicio.
            </p>

            <h2>3. Planes de suscripción y precios</h2>
            <p>
                VibraHeka ofrece distintos planes de suscripción con acceso a diferentes niveles de
                contenido y servicios. Los precios, periodicidad y características de cada plan
                están detallados en la página de precios de la Plataforma, que se considera parte
                integrante de estos Términos.
            </p>
            <ul>
                <li>Los precios incluyen el IVA aplicable según la normativa europea vigente.</li>
                <li>VibraHeka se reserva el derecho a modificar los precios, notificándolo con al menos <strong>30 días de antelación</strong> por correo electrónico.</li>
                <li>Si no aceptas la modificación de precio, puedes cancelar tu suscripción antes de que entre en vigor el nuevo precio sin coste adicional.</li>
            </ul>

            <h2>4. Facturación y pago</h2>
            <p>
                Las suscripciones se renuevan automáticamente al final de cada periodo de
                facturación (mensual o anual, según el plan contratado) hasta que sean canceladas.
                El cargo se realiza en la fecha de renovación mediante el método de pago registrado.
            </p>
            <ul>
                <li>El procesamiento de pagos está gestionado por un proveedor externo certificado PCI DSS. VibraHeka no almacena los datos de tu tarjeta.</li>
                <li>Si el pago falla, intentaremos procesarlo de nuevo y te notificaremos por correo. Si el fallo persiste, el acceso a los servicios de pago podrá suspenderse temporalmente.</li>
                <li>Recibirás una factura electrónica por cada cargo a tu dirección de correo registrada.</li>
            </ul>

            <h2>5. Periodo de prueba y promociones</h2>
            <p>
                Cuando VibraHeka ofrezca un periodo de prueba gratuito, el acceso a las
                funcionalidades del plan comenzará de inmediato. Al finalizar el periodo de prueba,
                la suscripción se convertirá automáticamente en de pago salvo que la canceles antes
                de la fecha indicada al registrarte.
            </p>

            <h2>6. Cancelación de la suscripción</h2>
            <p>
                Puedes cancelar tu suscripción en cualquier momento desde los ajustes de tu cuenta
                o contactando con nosotros en{" "}
                <a href="mailto:hola@vibraheka.com">hola@vibraheka.com</a>.
            </p>
            <ul>
                <li>La cancelación es efectiva al final del periodo de facturación en curso. Seguirás teniendo acceso al servicio hasta esa fecha.</li>
                <li>No se realizan cargos adicionales tras la cancelación.</li>
                <li>Los datos de tu cuenta se conservarán según lo establecido en nuestra <a href="/politica-de-privacidad">Política de Privacidad</a>.</li>
            </ul>

            <h2>7. Derecho de desistimiento</h2>
            <p>
                De conformidad con el <strong>Real Decreto Legislativo 1/2007</strong> (Texto Refundido
                de la Ley General para la Defensa de los Consumidores) y la{" "}
                <strong>Directiva 2011/83/UE</strong> sobre derechos de los consumidores, tienes
                derecho a desistir del contrato en el plazo de <strong>14 días naturales</strong>{" "}
                desde la fecha de contratación, sin necesidad de justificación.
            </p>
            <p>
                Para ejercer este derecho, comunícanoslo antes de que expire el plazo enviando un
                correo a <a href="mailto:hola@vibraheka.com">hola@vibraheka.com</a> con el asunto
                «Desistimiento» e indicando tu nombre y cuenta.
            </p>
            <div className="legal-highlight">
                <p>
                    <strong>Excepción al desistimiento:</strong> Si durante el periodo de 14 días
                    has hecho uso de los contenidos digitales o los servicios (acceso a terapeutas,
                    sesiones, etc.) y has aceptado expresamente comenzar la ejecución del contrato
                    antes de que finalice dicho plazo, perderás el derecho de desistimiento sobre
                    la parte del servicio ya consumida, conforme al art. 103.m) del TRLGDCU.
                </p>
            </div>

            <h2>8. Política de reembolsos</h2>
            <p>
                Fuera del periodo de desistimiento, no se realizan reembolsos por periodos de
                suscripción ya abonados y no utilizados, salvo en los siguientes casos:
            </p>
            <ul>
                <li>Error en el cobro imputable a VibraHeka.</li>
                <li>Interrupción no planificada del servicio superior a 72 horas continuadas imputable a VibraHeka.</li>
                <li>Otros supuestos previstos por la normativa de protección al consumidor aplicable.</li>
            </ul>
            <p>
                Para solicitar un reembolso, contacta con nosotros en{" "}
                <a href="mailto:hola@vibraheka.com">hola@vibraheka.com</a>. Estudiaremos tu caso
                y te responderemos en un plazo máximo de 10 días hábiles.
            </p>

            <h2>9. Obligaciones y conducta del usuario</h2>
            <p>El usuario se compromete a:</p>
            <ul>
                <li>Utilizar la Plataforma de forma personal y no transferir el acceso a terceros.</li>
                <li>Tratar con respeto a los terapeutas y otros miembros de la comunidad.</li>
                <li>No grabar, reproducir ni distribuir las sesiones o contenidos exclusivos sin autorización.</li>
                <li>No utilizar la Plataforma para fines ilegales, fraudulentos o que vulneren derechos de terceros.</li>
            </ul>

            <h2>10. Disponibilidad y modificaciones del servicio</h2>
            <p>
                VibraHeka se esfuerza por mantener la Plataforma disponible de forma continua, pero
                no garantiza la ausencia de interrupciones. Podemos modificar, actualizar o
                discontinuar funcionalidades del servicio, notificando los cambios significativos
                con antelación razonable.
            </p>

            <h2>11. Limitación de responsabilidad</h2>
            <p>
                En la medida en que lo permita la legislación aplicable, VibraHeka no será responsable
                de daños indirectos, incidentales, especiales o consecuentes derivados del uso o la
                imposibilidad de usar el servicio. Nuestra responsabilidad total no excederá el importe
                abonado por el usuario en los 12 meses anteriores al hecho generador del daño.
            </p>
            <p>
                Nada de lo anterior limita los derechos que como consumidor europeo te corresponden
                por ley de forma imperativa.
            </p>

            <h2>12. Legislación aplicable y resolución de conflictos</h2>
            <p>
                Estos Términos se rigen por la legislación española, sin perjuicio de las normas
                imperativas de protección al consumidor del país de residencia del usuario dentro
                de la Unión Europea.
            </p>
            <p>
                Para la resolución de controversias, las partes podrán acudir a la plataforma
                europea de resolución de litigios en línea:{" "}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                    ec.europa.eu/consumers/odr
                </a>
                . En última instancia, serán competentes los Juzgados y Tribunales del domicilio
                del consumidor.
            </p>

            <h2>13. Contacto</h2>
            <div className="legal-contact-block">
                <p>Para cualquier consulta sobre estos Términos y Condiciones:</p>
                <p><strong>Email:</strong> <a href="mailto:hola@vibraheka.com">hola@vibraheka.com</a></p>
                <p><strong>Asunto:</strong> Términos y Condiciones</p>
            </div>

        </LegalPage>
    );
}
