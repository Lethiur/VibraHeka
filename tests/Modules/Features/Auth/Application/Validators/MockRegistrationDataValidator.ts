import RegistrationDataValidator from "@auth/Application/Validators/RegistrationDataValidator";
import { RegistrationData } from "@auth/Domain/Models/RegistrationData";
import { ValidationErrors } from "fluentvalidation-ts";

export default class MockRegistrationDataValidator extends RegistrationDataValidator {
    public validate = jest.fn<ValidationErrors<RegistrationData>, [RegistrationData]>();

    constructor() {
        super();
    }

    public mockValidationSuccess() {
        this.validate.mockReturnValue({});
    }

    public mockValidationFailure(errors: ValidationErrors<RegistrationData>) {
        this.validate.mockReturnValue(errors);
    }
}
