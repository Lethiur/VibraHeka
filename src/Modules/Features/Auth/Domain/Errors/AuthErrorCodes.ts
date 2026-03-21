// Constantes de errores conocidos por el backend
export enum AuthErrorCodes {
    USER_ALREADY_EXISTS = 'US-000',
    INVALID_PASSWORD = 'US-001',
    INVALID_FORM = 'US-002',
    USER_NOT_FOUND = 'US-003',
    INVALID_VERIFICATION_CODE = 'US-004',
    UNEXPECTED_ERROR = 'US-005', // Note: UserException calls UnexpectedError E-005
    INVALID_EMAIL = 'US-006', // Note: UserException calls InvalidEmail E-006, same as TooManyAttempts if not a typo, assuming distinction by context or different endpoints
    TOO_MANY_ATTEMPTS = 'US-006', // Conflict in provided snippet, verify if possible. Assuming E-006 is shared or context dependent. Keeping both keys mapped to same string.
    INVALID_FULL_NAME = 'US-007', // Note: UserException calls InvalidFullName E-007, same as NotAuthorized
    NOT_AUTHORIZED = 'US-007',
    EXPIRED_CODE = 'US-008',
    WRONG_VERIFICATION_CODE = 'US-009',
    USER_NOT_CONFIRMED = 'US-010',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR' // Fallback for frontend
}

export namespace AuthErrorCodes {
    export function fromString(code: string): AuthErrorCodes {
        // Obtenemos todos los valores del enum para verificar si el código existe
        const values = Object.values(AuthErrorCodes) as string[];
        if (values.includes(code)) {
            console.log(code)
            return code as AuthErrorCodes;
        }
        return AuthErrorCodes.UNKNOWN_ERROR;
    }
}
