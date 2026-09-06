export default interface ChangePasswordCommand {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
