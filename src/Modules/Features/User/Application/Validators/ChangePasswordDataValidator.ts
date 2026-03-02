import { Validator } from "fluentvalidation-ts";
import { IChangePasswordData } from "@users/Domain/Entities/IChangePasswordData";
import { ProfileApplicationErrors } from "@users/Application/Errors/ProfileApplicationErrors";
import {
    hasNumber,
    hasSymbol,
    hasUppercase,
    PASSWORD_MIN_LENGTH
} from "@core/Application/Validation/PasswordPolicy";

export default class ChangePasswordDataValidator extends Validator<IChangePasswordData> {
    constructor() {
        super();

        this.ruleFor("CurrentPassword")
            .notEmpty()
            .withMessage(ProfileApplicationErrors.CURRENT_PASSWORD_NOT_PRESENT);

        this.ruleFor("NewPassword")
            .notEmpty()
            .withMessage(ProfileApplicationErrors.NEW_PASSWORD_NOT_PRESENT)
            .minLength(PASSWORD_MIN_LENGTH)
            .withMessage(ProfileApplicationErrors.NEW_PASSWORD_TOO_SHORT)
            .must((password) => hasUppercase(password))
            .withMessage(ProfileApplicationErrors.NEW_PASSWORD_REQUIRES_UPPERCASE)
            .must((password) => hasNumber(password))
            .withMessage(ProfileApplicationErrors.NEW_PASSWORD_REQUIRES_NUMBER)
            .must((password) => hasSymbol(password))
            .withMessage(ProfileApplicationErrors.NEW_PASSWORD_REQUIRES_SYMBOL);

        this.ruleFor("NewPasswordConfirmation")
            .notEmpty()
            .withMessage(ProfileApplicationErrors.NEW_PASSWORD_CONFIRMATION_NOT_PRESENT)
            .minLength(6)
            .withMessage(ProfileApplicationErrors.NEW_PASSWORD_CONFIRMATION_TOO_SHORT);
    }
}
