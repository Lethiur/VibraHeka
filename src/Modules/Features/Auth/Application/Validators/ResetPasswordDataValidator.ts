import { Validator } from "fluentvalidation-ts";
import { ResetPasswordData } from "@auth/Domain/Models/ResetPasswordData";
import { AuthApplicationErrors } from "@auth/Application/Errors/AuthApplicationErrors";

export default class ResetPasswordDataValidator extends Validator<ResetPasswordData> {
    constructor() {
        super();

        this.ruleFor("encryptedToken")
            .notEmpty()
            .withMessage(AuthApplicationErrors.RESET_PASSWORD_TOKEN_NOT_PRESENT);

        this.ruleFor("newPassword")
            .notEmpty()
            .withMessage(AuthApplicationErrors.PASSWORD_NOT_PRESENT)
            .minLength(6)
            .withMessage(AuthApplicationErrors.PASSWORD_TOO_SHORT);

        this.ruleFor("newPasswordConfirmation")
            .notEmpty()
            .withMessage(AuthApplicationErrors.PASSWORD_CONFIRMATION_NOT_PRESENT)
            .minLength(6)
            .withMessage(AuthApplicationErrors.PASSWORD_CONFIRMATION_TOO_SHORT);
    }
}
