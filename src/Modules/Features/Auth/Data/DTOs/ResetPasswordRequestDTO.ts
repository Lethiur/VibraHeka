export interface ResetPasswordRequestDTO {
    encryptedToken: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
