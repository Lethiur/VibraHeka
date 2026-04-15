import LegalPage from "@legal/Presentation/Components/LegalPage/LegalPage";

export default function PrivacyPolicy() {
    return (
        <LegalPage title="Política de Privacidad" lastUpdated="abril de 2026">

            <div className="legal-highlight">
                <p>
                    En VibraHeka nos comprometemos a proteger tu privacidad y tratar tus datos
                    personales con transparencia, seguridad y respeto, de conformidad con el{" "}
                    <strong>
                        Reglamento (UE) 2016/679 General de Protección de Datos (RGPD)
                    </strong>{" "}
                    y la{" "}
                    <strong>
                        Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos
                        digitales (LOPDGDD)
                    </strong>
                    .
                </p>
            </div>

            <h2>1. Responsable del tratamiento</h2>
            <div className="legal-contact-block">
                <p><strong>Denominación:</strong> VibraHeka</p>
                <p><strong>Actividad:</strong> Plataforma de bienestar online y servicios de terapia energética</p>
                <p><strong>Correo electrónico:</strong> <a href="mailto:privacidad@vibraheka.com">privacidad@vibraheka.com</a></p>
                <p><strong>Ámbito territorial:</strong> Unión Europea</p>
            </div>

            <h2>2. Datos que recopilamos</h2>
            <p>
                Recopilamos únicamente los datos necesarios para prestarte nuestros servicios. En función
                de cómo interactúes con la plataforma, tratamos las siguientes categorías:
            </p>

            <h3>2.1 Datos de registro y cuenta</h3>
            <ul>
                <li>Nombre y apellidos</li>
                <li>Dirección de correo electrónico</li>
                <li>Contraseña (almacenada de forma cifrada; nunca en texto plano)</li>
            </ul>

            <h3>2.2 Datos de suscripción y facturación</h3>
            <ul>
                <li>Datos necesarios para procesar el pago (gestionados por nuestro proveedor de pagos certificado PCI DSS; VibraHeka no almacena datos de tarjeta)</li>
                <li>Historial de facturas y transacciones</li>
                <li>Plan de suscripción activo</li>
            </ul>

            <h3>2.3 Datos de uso del servicio</h3>
            <ul>
                <li>Registros de acceso (fecha, hora, dirección IP)</li>
                <li>Interacciones con terapeutas y contenidos de la plataforma</li>
                <li>Preferencias y configuración de cuenta</li>
            </ul>

            <h3>2.4 Comunicaciones</h3>
            <ul>
                <li>Mensajes enviados a través de la plataforma o al servicio de atención al usuario</li>
                <li>Correos electrónicos transaccionales (confirmaciones, notificaciones de suscripción)</li>
            </ul>

            <h2>3. Base jurídica del tratamiento</h2>
            <p>Tratamos tus datos con las siguientes bases legales:</p>
            <ul>
                <li>
                    <strong>Ejecución de un contrato</strong> (art. 6.1.b RGPD): para gestionar tu cuenta,
                    prestarte los servicios contratados y tramitar tu suscripción y pagos.
                </li>
                <li>
                    <strong>Interés legítimo</strong> (art. 6.1.f RGPD): para la seguridad de la
                    plataforma, la prevención del fraude y la mejora de nuestros servicios.
                </li>
                <li>
                    <strong>Consentimiento</strong> (art. 6.1.a RGPD): para el envío de comunicaciones
                    comerciales o de marketing, cuando así lo hayas aceptado expresamente.
                </li>
                <li>
                    <strong>Obligación legal</strong> (art. 6.1.c RGPD): para el cumplimiento de
                    obligaciones fiscales, contables y de otra índole exigidas por la normativa vigente.
                </li>
            </ul>

            <h2>4. Finalidades del tratamiento</h2>
            <ul>
                <li>Gestionar tu registro, acceso y cuenta de usuario.</li>
                <li>Procesar y gestionar tu suscripción, incluyendo cobros periódicos y facturación.</li>
                <li>Permitirte reservar y acceder a sesiones con terapeutas.</li>
                <li>Enviarte comunicaciones transaccionales relacionadas con tu cuenta.</li>
                <li>Atender tus consultas y solicitudes de soporte.</li>
                <li>Cumplir obligaciones legales y fiscales.</li>
                <li>Prevenir el fraude y garantizar la seguridad de la plataforma.</li>
                <li>
                    Con tu consentimiento previo: enviarte comunicaciones sobre novedades, ofertas y
                    contenidos relacionados con el bienestar.
                </li>
            </ul>

            <h2>5. Plazo de conservación</h2>
            <ul>
                <li>
                    <strong>Datos de cuenta activa:</strong> mientras mantengas tu cuenta abierta y
                    durante el tiempo necesario para prestarte el servicio.
                </li>
                <li>
                    <strong>Datos de facturación:</strong> 5 años desde la última transacción, de
                    conformidad con la normativa tributaria española.
                </li>
                <li>
                    <strong>Datos de comunicaciones:</strong> hasta que ejerzas tu derecho de supresión
                    o durante el plazo de prescripción de posibles responsabilidades legales.
                </li>
                <li>
                    <strong>Tras la cancelación de cuenta:</strong> bloqueamos tus datos durante 3 años
                    para atender posibles reclamaciones, transcurridos los cuales los eliminamos
                    definitivamente.
                </li>
            </ul>

            <h2>6. Destinatarios y encargados del tratamiento</h2>
            <p>
                No cedemos tus datos a terceros con fines comerciales. Compartimos datos únicamente con
                proveedores de servicios que actúan como encargados del tratamiento bajo contrato y que
                ofrecen garantías suficientes:
            </p>
            <ul>
                <li><strong>Proveedor de pagos:</strong> procesamiento de transacciones (certificado PCI DSS)</li>
                <li><strong>Infraestructura cloud (AWS):</strong> almacenamiento y ejecución de la plataforma en la Región Europea</li>
                <li><strong>Servicio de email transaccional:</strong> envío de notificaciones de cuenta</li>
            </ul>
            <p>
                Todos nuestros proveedores principales operan dentro del Espacio Económico Europeo o
                cuentan con mecanismos de transferencia adecuados conforme al RGPD (Cláusulas
                Contractuales Tipo aprobadas por la Comisión Europea).
            </p>

            <h2>7. Tus derechos</h2>
            <p>
                En virtud del RGPD, tienes derecho a:
            </p>
            <ul>
                <li><strong>Acceso:</strong> obtener confirmación sobre si tratamos tus datos y acceder a ellos.</li>
                <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
                <li><strong>Supresión («derecho al olvido»):</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios o retires tu consentimiento.</li>
                <li><strong>Limitación:</strong> solicitar que restrinjamos el tratamiento en determinadas circunstancias.</li>
                <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado y legible por máquina.</li>
                <li><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo o para marketing directo.</li>
                <li><strong>Retirada del consentimiento:</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento anterior.</li>
            </ul>
            <p>
                Para ejercer cualquiera de estos derechos, envía una solicitud a{" "}
                <a href="mailto:privacidad@vibraheka.com">privacidad@vibraheka.com</a> indicando
                tu nombre y el derecho que deseas ejercer. Responderemos en el plazo máximo de{" "}
                <strong>30 días</strong>.
            </p>
            <p>
                Si consideras que el tratamiento de tus datos no es conforme a la normativa, tienes
                derecho a presentar una reclamación ante la{" "}
                <strong>Agencia Española de Protección de Datos (AEPD)</strong>{" "}
                en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
            </p>

            <h2>8. Seguridad</h2>
            <p>
                Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos contra
                el acceso no autorizado, la alteración, la divulgación o la destrucción. Estas medidas
                incluyen, entre otras, cifrado en tránsito (TLS), contraseñas almacenadas con hash
                seguro, accesos restringidos y auditorías periódicas.
            </p>
            <p>
                En caso de brecha de seguridad que pueda afectar a tus derechos, lo notificaremos a
                la autoridad supervisora en un plazo de 72 horas y a los usuarios afectados sin demora
                indebida, conforme al art. 33–34 RGPD.
            </p>

            <h2>9. Menores de edad</h2>
            <p>
                Nuestros servicios están dirigidos a mayores de 16 años. No recopilamos
                intencionadamente datos de menores. Si detectamos que hemos tratado datos de un menor
                sin la autorización parental requerida, los eliminaremos a la mayor brevedad.
            </p>

            <h2>10. Cambios en esta política</h2>
            <p>
                Podemos actualizar esta Política de Privacidad para reflejar cambios normativos o en
                nuestros servicios. Te notificaremos de cambios significativos por correo electrónico
                o mediante un aviso destacado en la plataforma. La fecha de «última actualización»
                al inicio de este documento indica la versión vigente.
            </p>

        </LegalPage>
    );
}
