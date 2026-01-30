import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { AuthApplicationErrors } from "@auth/Application/Errors/AuthApplicationErrors";


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
                [AuthApplicationErrors.VERIFICATION_CODE_TOO_SHORT]: "El código de verificación debe tener al menos 6 caracteres",
                [AuthApplicationErrors.VERIFICATION_CODE_NOT_PRESENT]: "El código de verificación es obligatorio"
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
                        saved_title: "Guardado",
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
                options: {
                    delete: "Eliminar",
                    edit: "Editar"
                },
                form: {
                    title: "Agregar terapeuta",
                    description: "Agrega un nuevo terapeuta al sistema.",
                    name_label: "Nombre",
                    email_label: "Email",
                    password_label: "Contraseña",
                    submit_button: "Crear Terapeuta",
                    submitting_button: "Creando..."
                }
            },
            register: {
                title: "Registrate en vibraheka!",
                description: "Registrate en vibraheka para poder disfrutar de todos los beneficios que ofrecemos.",
                form: {
                    name_label: "Nombre",
                    email_label: "Email",
                    password_label: "Password",
                    submit_button: "Registrarse",
                    submitting_button: "Registrando..."
                }
            },
            verification: {
                title: "Verifica tu cuenta",
                description: "Verifica tu cuenta para poder disfrutar de todos los beneficios que ofrecemos.",
                form: {
                    code_label: "Código de verificación",
                    code_help: "Introduce el código que te ha llegado a tu correo",
                    submit_button: "Verificar",
                    submitting_button: "Verificando..."
                }
            },
            login: {
                title: 'Identificarse',
                description: 'Identificate para acceder a tu cuenta.',
                form: {
                    email_label: "Email",
                    email_help: "Introduce tu email",
                    password_label: "Contraseña",
                    password_help: "No compartas tu contraseña con nadie",
                    submit_button: "Identificarse",
                    submitting_button: "Verificando..."

                }
            }
        }
    }
};
