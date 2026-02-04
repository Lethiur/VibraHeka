import VerificationDataValidator from "@auth/Application/Validators/VerificationDataValidator";
import { VerificationData } from "@auth/Domain/Models/VerificationData";
import { ValidationErrors } from "fluentvalidation-ts";

export default class MockVerificationDataValidator extends VerificationDataValidator {
    public validate = jest.fn<ValidationErrors<VerificationData>, [VerificationData]>();

    constructor() {
        super();
    }

    public mockValidationSuccess() {
        this.validate.mockReturnValue({});
    }

    public mockValidationFailure(errors: ValidationErrors<VerificationData>) {
        this.validate.mockReturnValue(errors);
    }
}
