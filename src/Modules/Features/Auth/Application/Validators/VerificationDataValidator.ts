import {VerificationData} from "../../Domain/Entities/VerificationData";
import {Validator} from "fluentvalidation-ts";
import {AuthApplicationErrors} from "../Errors/AuthApplicationErrors";

export default class VerificationDataValidator extends Validator<VerificationData> {
    
    constructor() {
        super();
        this.ruleFor('Email')
            .notEmpty()
            .withMessage(AuthApplicationErrors.EMAIL_NOT_PRESENT)
            .emailAddress()
            .withMessage(AuthApplicationErrors.EMAIL_INVALID);

        this.ruleFor("Code")
            .notEmpty()
            .withMessage(AuthApplicationErrors.VERIFICATION_CODE_NOT_PRESENT)
            .minLength(6)
            .withMessage(AuthApplicationErrors.VERIFICATION_CODE_TOO_SHORT);
    }
}