/**
 * Resultado de la operación de registro
 */
export interface RegistrationResult {
    /**
     * Id del usuario registrado
     */
    userId: string;
    /**
     * Indica si el usuario necesita confirmación
     */
    needsConfirmation: boolean;
}
