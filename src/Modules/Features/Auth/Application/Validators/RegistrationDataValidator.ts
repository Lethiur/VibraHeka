import { Validator } from "fluentvalidation-ts";
import { RegistrationData } from "../../Domain/Models/RegistrationData";
import { AuthApplicationErrors } from "../Errors/AuthApplicationErrors";
import {
    hasNumber,
    hasSymbol,
    hasUppercase,
    PASSWORD_MIN_LENGTH
} from "@core/Application/Validation/PasswordPolicy";

export default class RegistrationDataValidator extends Validator<RegistrationData> {
    constructor() {
        super();
        this.ruleFor('firstName')
            .notEmpty()
            .withMessage(AuthApplicationErrors.FIRST_NAME_NOT_PRESENT)
            .minLength(2)
            .withMessage(AuthApplicationErrors.FIRST_NAME_TOO_SHORT);

        this.ruleFor('middleName')
            .notEmpty()
            .withMessage(AuthApplicationErrors.MIDDLE_NAME_NOT_PRESENT)
            .minLength(2)
            .withMessage(AuthApplicationErrors.MIDDLE_NAME_TOO_SHORT);

        this.ruleFor('lastName')
            .notEmpty()
            .withMessage(AuthApplicationErrors.LAST_NAME_NOT_PRESENT)
            .minLength(2)
            .withMessage(AuthApplicationErrors.LAST_NAME_TOO_SHORT);

        this.ruleFor('email')
            .notEmpty()
            .withMessage(AuthApplicationErrors.EMAIL_NOT_PRESENT)
            .emailAddress()
            .withMessage(AuthApplicationErrors.EMAIL_INVALID);

        this.ruleFor('password')
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
    }
}
