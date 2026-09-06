import { Validator } from "fluentvalidation-ts";
import { ForgotPasswordCommand } from "@auth/Domain/Commands/ForgotPasswordCommand.ts";
import { AuthApplicationErrors } from "@auth/Application/Errors/AuthApplicationErrors";

export default class ForgotPasswordDataValidator extends Validator<ForgotPasswordCommand> {
    constructor() {
        super();
        this.ruleFor("Email")
            .notEmpty()
            .withMessage(AuthApplicationErrors.EMAIL_NOT_PRESENT)
            .emailAddress()
            .withMessage(AuthApplicationErrors.EMAIL_INVALID);
    }
}
