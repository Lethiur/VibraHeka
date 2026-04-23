import { Validator } from "fluentvalidation-ts";
import { ResetPasswordData } from "@auth/Domain/Entities/ResetPasswordData";
import { AuthApplicationErrors } from "@auth/Application/Errors/AuthApplicationErrors";
import {
    hasNumber,
    hasSymbol,
    hasUppercase,
    PASSWORD_MIN_LENGTH
} from "@core/Application/Validation/PasswordPolicy";

export default class ResetPasswordDataValidator extends Validator<ResetPasswordData> {
    constructor() {
        super();

        this.ruleFor("EncryptedToken")
            .notEmpty()
            .withMessage(AuthApplicationErrors.RESET_PASSWORD_TOKEN_NOT_PRESENT);

        this.ruleFor("NewPassword")
            .notEmpty()
            .withMessage(AuthApplicationErrors.PASSWORD_NOT_PRESENT)
            .minLength(PASSWORD_MIN_LENGTH)
            .withMessage(AuthApplicationErrors.PASSWORD_TOO_SHORT)
            .must((password) => hasUppercase(password))
            .withMessage(AuthApplicationErrors.PASSWORD_REQUIRES_UPPERCASE)
            .must((password) => hasNumber(password))
            .withMessage(AuthApplicationErrors.PASSWORD_REQUIRES_NUMBER)
            .must((password) => hasSymbol(password))
            .withMessage(AuthApplicationErrors.PASSWORD_REQUIRES_SYMBOL);

        this.ruleFor("NewPasswordConfirmation")
            .notEmpty()
            .withMessage(AuthApplicationErrors.PASSWORD_CONFIRMATION_NOT_PRESENT)
            .minLength(6)
            .withMessage(AuthApplicationErrors.PASSWORD_CONFIRMATION_TOO_SHORT);
    }
}
