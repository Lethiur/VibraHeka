import { Validator } from "fluentvalidation-ts";
import { ForgotPasswordData } from "@auth/Domain/Entities/ForgotPasswordData";
import { AuthApplicationErrors } from "@auth/Application/Errors/AuthApplicationErrors";

export default class ForgotPasswordDataValidator extends Validator<ForgotPasswordData> {
    constructor() {
        super();
        this.ruleFor("Email")
            .notEmpty()
            .withMessage(AuthApplicationErrors.EMAIL_NOT_PRESENT)
            .emailAddress()
            .withMessage(AuthApplicationErrors.EMAIL_INVALID);
    }
}
