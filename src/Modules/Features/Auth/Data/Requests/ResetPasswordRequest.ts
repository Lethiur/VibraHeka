export interface ResetPasswordRequest {
    encryptedToken: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
