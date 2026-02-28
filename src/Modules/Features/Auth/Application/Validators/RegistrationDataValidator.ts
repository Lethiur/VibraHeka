import { Validator } from "fluentvalidation-ts";
import { RegistrationData } from "../../Domain/Models/RegistrationData";
import { AuthApplicationErrors } from "../Errors/AuthApplicationErrors";

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
            .minLength(6)
            .withMessage(AuthApplicationErrors.PASSWORD_TOO_SHORT);
    }
}