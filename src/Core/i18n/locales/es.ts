import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { AuthApplicationErrors } from "@auth/Application/Errors/AuthApplicationErrors";
import { ProfileApplicationErrors } from "@users/Application/Errors/ProfileApplicationErrors";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";

export const es = {
    translation: {
        errors: {
            auth: {
                [AuthErrorCodes.USER_ALREADY_EXISTS]: "El usuario o email ya existe en el sistema.",
                [AuthErrorCodes.INVALID_PASSWORD]: "La contraseña proporcionada no es válida.",
                [AuthErrorCodes.INVALID_FORM]: "Los datos del formulario son inválidos.",
                [AuthErrorCodes.USER_NOT_FOUND]: "Usuario no encontrado.",
                [AuthErrorCodes.INVALID_VERIFICATION_CODE]: "El código de verificación es inválido.",
                [AuthErrorCodes.WRONG_VERIFICATION_CODE]: "El código de verificación es incorrecto.",
                [AuthErrorCodes.INVALID_EMAIL]: "El formato del correo electrónico es inválido.",
                [AuthErrorCodes.INVALID_FULL_NAME]: "El nombre completo no cumple con los criterios requeridos.",
                [AuthErrorCodes.EXPIRED_CODE]: "El código de verificación ha expirado.",
                [AuthErrorCodes.USER_NOT_CONFIRMED]: "La cuenta de usuario no ha sido confirmada.",
                [AuthErrorCodes.UNEXPECTED_ERROR]: "Ha ocurrido un error inesperado, por favor intenta nuevamente.",
                [AuthErrorCodes.UNKNOWN_ERROR]: "Error desconocido.",
                [AuthApplicationErrors.FULL_NAME_NOT_PRESENT]: "El nombre es obligatorio",
                [AuthApplicationErrors.FULL_NAME_TOO_SHORT]: "El nombre debe tener al menos 2 caracteres",
                [AuthApplicationErrors.EMAIL_NOT_PRESENT]: "El email es obligatorio",
                [AuthApplicationErrors.EMAIL_INVALID]: "Debe ingresar un email válido",
                [AuthApplicationErrors.PASSWORD_NOT_PRESENT]: "La contraseña es obligatoria",
                [AuthApplicationErrors.PASSWORD_TOO_SHORT]: "La contraseña debe tener al menos 6 caracteres",
                [AuthApplicationErrors.PASSWORD_REQUIRES_UPPERCASE]: "La contraseña debe incluir al menos una mayúscula.",
                [AuthApplicationErrors.PASSWORD_REQUIRES_NUMBER]: "La contraseña debe incluir al menos un número.",
                [AuthApplicationErrors.PASSWORD_REQUIRES_SYMBOL]: "La contraseña debe incluir al menos un símbolo.",
                [AuthApplicationErrors.RESET_PASSWORD_TOKEN_NOT_PRESENT]: "El token de recuperacion no es valido o no existe.",
                [AuthApplicationErrors.PASSWORD_CONFIRMATION_NOT_PRESENT]: "La confirmacion de contraseña es obligatoria",
                [AuthApplicationErrors.PASSWORD_CONFIRMATION_TOO_SHORT]: "La confirmacion debe tener al menos 6 caracteres",
                [AuthApplicationErrors.PASSWORD_CONFIRMATION_MISMATCH]: "Las contraseñas no coinciden",
                [AuthApplicationErrors.VERIFICATION_CODE_TOO_SHORT]: "El código de verificación debe tener al menos 6 caracteres",
                [AuthApplicationErrors.VERIFICATION_CODE_NOT_PRESENT]: "El código de verificación es obligatorio",
                [AuthApplicationErrors.FIRST_NAME_NOT_PRESENT]: "El nombre es obligatorio",
                [AuthApplicationErrors.FIRST_NAME_TOO_SHORT]: "El nombre debe tener al menos 2 caracteres",
                [AuthApplicationErrors.MIDDLE_NAME_NOT_PRESENT]: "El primer apellido es obligatorio",
                [AuthApplicationErrors.MIDDLE_NAME_TOO_SHORT]: "El primer apellido debe tener al menos 2 caracteres",
                [AuthApplicationErrors.LAST_NAME_NOT_PRESENT]: "El segundo apellido es obligatorio",
                [AuthApplicationErrors.LAST_NAME_TOO_SHORT]: "El segundo apellido debe tener al menos 2 caracteres"
            },
            profile: {
                [ProfileErrors.INVALID_PROFILE_ID]: "El perfil indicado no es válido.",
                [ProfileErrors.INVALID_PASSWORD]: "La nueva contraseña no cumple los criterios de seguridad.",
                [ProfileErrors.NOT_AUTHORIZED]: "La contraseña actual no es válida.",
                [ProfileErrors.RATE_LIMITED]: "Demasiados intentos. Inténtalo de nuevo en unos minutos.",
                [ProfileErrors.GENERIC_ERROR]: "Ha ocurrido un error inesperado. Inténtalo nuevamente.",
                [ProfileApplicationErrors.CURRENT_PASSWORD_NOT_PRESENT]: "La contraseña actual es obligatoria.",
                [ProfileApplicationErrors.NEW_PASSWORD_NOT_PRESENT]: "La nueva contraseña es obligatoria.",
                [ProfileApplicationErrors.NEW_PASSWORD_TOO_SHORT]: "La nueva contraseña debe tener al menos 6 caracteres.",
                [ProfileApplicationErrors.NEW_PASSWORD_REQUIRES_UPPERCASE]: "La nueva contraseña debe incluir al menos una mayúscula.",
                [ProfileApplicationErrors.NEW_PASSWORD_REQUIRES_NUMBER]: "La nueva contraseña debe incluir al menos un número.",
                [ProfileApplicationErrors.NEW_PASSWORD_REQUIRES_SYMBOL]: "La nueva contraseña debe incluir al menos un símbolo.",
                [ProfileApplicationErrors.NEW_PASSWORD_CONFIRMATION_NOT_PRESENT]: "Debes confirmar la nueva contraseña.",
                [ProfileApplicationErrors.NEW_PASSWORD_CONFIRMATION_TOO_SHORT]: "La confirmación debe tener al menos 6 caracteres.",
                [ProfileApplicationErrors.PASSWORD_CONFIRMATION_MISMATCH]: "Las contraseñas no coinciden."
            }
        },
        components: {
            auth: {
                password_strength: {
                    title: "Fuerza de contraseña",
                    empty: "Sin definir",
                    weak: "Debil",
                    medium: "Media",
                    good: "Buena",
                    strong: "Fuerte",
                    requirements: {
                        title: "Requisitos",
                        min_length: "Minimo {{count}} caracteres",
                        uppercase: "Al menos una mayúscula",
                        number: "Al menos un número",
                        symbol: "Al menos un símbolo"
                    }
                }
            }
        },

        pages: {
            admin: {
                title: "Panel de administracion",
                emails: {
                    title: "Plantillas de correo",
                    loading: "Cargando...",
                    count_text: "Hay: {{count}} plantillas",
                    templates_list_title: "Plantillas",
                    messages: {
                        saved_title: "Éxito",
                        saved_content: "Contenido guardado correctamente",
                        created_title: "Éxito",
                        created_content: "Plantilla creada correctamente",
                        upload_success_title: "Éxito",
                        upload_success_content: "Archivo adjunto subido",
                        error_title: "Error",
                        save_error: "Error al guardar el contenido",
                        upload_error: "Error al subir adjunto",
                        no_template_selected: "No se seleccionó ninguna plantilla"
                    },
                    form: {
                        create_title: "Crear plantilla",
                        name_label: "Nombre",
                        submit_button: "Crear plantilla"
                    }
                }
            },
            therapists: {
                title: "Administrar terapeutas",
                description: "Gestiona aqui los terapeutas registrados en el sistema.",
                list_title: "Lista de terapeutas",
                list_id: "Identificador",
                list_name: "Nombre",
                list_email: "Email",
                list_role: "Rol",
                list_actions: "Acciones",
                list_timezone: "Zona horaria",
                options: {
                    delete: "Eliminar",
                    edit: "Editar"
                },
                form: {
                    title: "Agregar terapeuta",
                    description: "Agrega un nuevo terapeuta al sistema.",
                    name_label: "Nombre",
                    middle_name_label: "Primer apellido",
                    last_name_label: "Segundo apellido",
                    email_label: "Email",
                    phone_label: "Telefono",
                    password_label: "Contraseña",
                    timezone_label: "Zona horaria",
                    submit_button: "Crear Terapeuta",
                    submitting_button: "Creando..."
                }
            },
            register: {
                title: "Registrate en vibraheka!",
                description: "Registrate en vibraheka para poder disfrutar de todos los beneficios que ofrecemos.",
                form: {
                    name_label: "Nombre",
                    middle_name_label: "Primer apellido",
                    last_name_label: "Segundo apellido",
                    email_label: "Email",
                    password_label: "Password",
                    password_confirmation_label: "Confirmar contraseña",
                    password_confirmation_help: "Repite la contraseña para confirmarla",
                    submit_button: "Registrarse",
                    submitting_button: "Registrando..."
                }
            },
            verification: {
                title: "Verifica tu cuenta",
                description: "Verifica tu cuenta para poder disfrutar de todos los beneficios que ofrecemos.",
                form: {
                    code_label: "Código de verificación",
                    code_help: "Introduce el código que te ha llegado a tu correo. Comprueba tu carpeta de spam si no lo recibes",
                    submit_button: "Verificar",
                    resend_button: "Reenviar codigo",
                    submitting_button: "Verificando..."
                }
            },
            login: {
                title: "Identificarse",
                description: "Identificate para acceder a tu cuenta.",
                form: {
                    email_label: "Email",
                    email_help: "Introduce tu email",
                    password_label: "Contraseña",
                    password_help: "No compartas tu contraseña con nadie",
                    forgot_password_link: "He olvidado mi contraseña",
                    submit_button: "Identificarse",
                    submitting_button: "Verificando..."
                }
            },
            forgot_password: {
                title: "Recupera tu contraseña",
                description: "Introduce tu email y te enviaremos las instrucciones para recuperar el acceso.",
                form: {
                    email_label: "Email",
                    email_help: "Introduce el correo asociado a tu cuenta",
                    submit_button: "Enviar instrucciones",
                    submitting_button: "Enviando...",
                    success_message: "Si existe una cuenta asociada al email, recibirás un correo con las instrucciones para recuperar tu contraseña.",
                    back_to_login: "Volver a identificarse"
                }
            },
            reset_password: {
                title: "Restablece tu contraseña",
                description: "Define una nueva contraseña para recuperar el acceso a tu cuenta.",
                form: {
                    password_label: "Nueva contraseña",
                    password_help: "Debe tener al menos 6 caracteres",
                    password_confirmation_label: "Confirmar nueva contraseña",
                    password_confirmation_help: "Repite la nueva contraseña",
                    submit_button: "Guardar nueva contraseña",
                    submitting_button: "Guardando...",
                    success_message: "Tu contraseña ha sido actualizada. Ya puedes iniciar sesion.",
                    back_to_login: "Ir a iniciar sesion"
                }
            }
        }
    }
};

