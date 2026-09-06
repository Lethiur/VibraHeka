export interface ResetPasswordCommand {
    encryptedToken: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
