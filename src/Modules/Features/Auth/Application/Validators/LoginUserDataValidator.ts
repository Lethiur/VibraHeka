import {Validator} from "fluentvalidation-ts";
import {AuthApplicationErrors} from "../Errors/AuthApplicationErrors";
import {LoginCommand} from "@auth/Domain/Commands/LoginCommand.ts";

/**
 * A validator class for validating login user data.
 *
 * This class extends the generic `Validator` and is designed to validate
 * the `LoginCommand` object. It ensures that the provided email and password fields
 * conform to specific rules and constraints.
 *
 * Validation rules:
 * - Email:
 *   - Must not be empty.
 *   - Must be a valid email address.
 * - Password:
 *   - Must not be empty.
 *   - Must have a minimum length of 6 characters.
 *
 * Error messages used during validation are obtained from `AuthApplicationErrors`.
 */
export default class LoginUserDataValidator extends Validator<LoginCommand> {
    
    constructor() {
        super();
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