import {LoginData} from "../../Domain/Entities/LoginData";
import {Validator} from "fluentvalidation-ts";
import {AuthApplicationErrors} from "../Errors/AuthApplicationErrors";

export default class LoginUserDataValidator extends Validator<LoginData> {
    
    constructor() {
        super();
        this.ruleFor('Email')
            .notEmpty()
            .withMessage(AuthApplicationErrors.EMAIL_NOT_PRESENT)
            .emailAddress()
            .withMessage(AuthApplicationErrors.EMAIL_INVALID);

        this.ruleFor('Password')
            .notEmpty()
            .withMessage(AuthApplicationErrors.PASSWORD_NOT_PRESENT)
            .minLength(6)
            .withMessage(AuthApplicationErrors.PASSWORD_TOO_SHORT);
    }
}