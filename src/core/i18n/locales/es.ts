import { AuthErrorCodes } from '../../../features/auth/domain/errors/AuthErrorCodes';

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
            }
        },
        pages: {
            register: {
                title: "Registrate en vibraheka!",
                description: "Registrate en vibraheka para poder disfrutar de todos los beneficios que ofrecemos.",
                form: {
                    name_label: "Nombre",
                    email_label: "Email",
                    password_label: "Password",
                    submit_button: "Registrarse",
                    submitting_button: "Registrando..."
                },
                validation: {
                    name_required: "El nombre es obligatorio",
                    name_length: "El nombre debe tener al menos 2 caracteres",
                    email_required: "El email es obligatorio",
                    email_invalid: "Debe ingresar un email válido",
                    password_required: "La contraseña es obligatoria",
                    password_length: "La contraseña debe tener al menos 6 caracteres"
                }
            }
        }
    }
};
