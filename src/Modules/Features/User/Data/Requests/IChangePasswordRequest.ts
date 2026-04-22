export default interface IChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
