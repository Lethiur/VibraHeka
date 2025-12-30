import {LoginData} from "../../Domain/Models/LoginData.ts";
import {Validator} from "fluentvalidation-ts";
import {AuthApplicationErrors} from "../Errors/AuthApplicationErrors.ts";

export default class LoginUserDataValidator extends Validator<LoginData> {
    
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